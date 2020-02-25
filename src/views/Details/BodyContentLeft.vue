<!-- 文章详情内容身体     左-->
<template>
  <div>
    <div class="ques" v-if="questionModal">
      <div class="ques-til">
        <div class="ques-til-l">
          <img :src="$store.state.user.userImg" alt />
        </div>
      </div>
      <div class="ques-des">
        <editor class="editor" :isClickEditor="isClickEditor" @editorContent="getEditorContent"></editor>
      </div>
      <div class="ques-foot">
        <a-checkbox>匿名提问</a-checkbox>
        <a-button class="ques-btn" type="primary" @click="questionSend">提交回答</a-button>
      </div>
    </div>
    <div class="left">
      <div class="left-head">
        <span class="left-head-left">{{details.answers&&details.answers.length}}个回答</span>
        <div class="left-head-right">
          默认排序
          <a-icon class="left-head-right-icon" type="menu-fold" />
        </div>
      </div>
      <div class="left-body" v-if="details.answers&&details.answers.length>0">
        <div class="left-body-item" v-for="(item,i) in details.answers" :key="i">
          <div class="left-body-user">
            <span class="left-body-user-img">
              <img :src="item.user.userImg" alt />
            </span>
            <div class="left-body-user-text">
              <div class="left-body-user-name">{{item.user.userName}}</div>
              <div class="left-body-user-detail">{{item.user.userIntroduce}}</div>
            </div>
          </div>
          <div class="left-body-person">{{item.like}}人赞同了该回答</div>
          <div
            class="left-body-content"
            :class="{'left-body-content-expand':item.isExpandText,'left-body-content-close':!item.isExpandText&&item.content&&item.content.length>400}"
            v-html="item.content"
          ></div>
          <div
            class="left-body-expand"
            @click="expandText(item)"
            v-if="!item.isExpandText&&item.content&&item.content.length>400"
          >
            展开阅读全文
            <a-icon type="down" />
          </div>
          <div class="left-body-time">发布于{{moment(item.createdTime).format("YYYY-MM-DD")}}</div>
          <div class="left-body-actions">
            <span class="left-body-actions-item">
              <a-button class="left-body-actions-up" icon="caret-up">赞同 {{item.like}}</a-button>
              <a-button class="left-body-actions-down" icon="caret-down"></a-button>
            </span>
            <span class="left-body-actions-item left-body-actions-text" @click="showComment(item)">
              <a-icon class="left-body-actions-icon" type="message" />
              <span v-if="item.isShowComment">收起评论</span>
              <span v-else @click="getComment(item._id,1)">{{item.commentCount}}条评论</span>
            </span>
            <span class="left-body-actions-item left-body-actions-text">
              <a-icon class="left-body-actions-icon" type="rocket" />分享
            </span>
            <span class="left-body-actions-item left-body-actions-text">
              <a-icon class="left-body-actions-icon" type="star" />收藏
            </span>
            <span
              class="left-body-actions-item left-body-actions-text left-body-actions-close"
              v-if="item.isExpandText"
              @click="closeText(item)"
            >
              收起
              <a-icon class="left-body-actions-icon" type="up" />
            </span>
          </div>
          <comment
            :isExpand="item.isShowComment"
            :comment="comments"
            :commentTotal="item.commentCount"
            @publishChildComment="publishCommentChild(arguments,i)"
            @publishRootComment="publishCommentRoot(arguments,item._id,item.questionId,i,item.user._id)"
            @pageChange="commentPageChange"
          ></comment>
        </div>
      </div>
      <div class="empty" v-if="details.answers&&details.answers.length===0">
        <a-icon type="frown" theme="filled" class="empty-icon" />
        <p class="empty-text">该问题还没有回答哦</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Editor from "../../components/Editor";
import Comment from "@/components/Comment";
export default {
  data() {
    return {
      id: this.$route.query.id, //问题id
      answerId: null, //回答id
      questionModal: this.$store.state.questionModal,
      isClickEditor: false,
      quesContent: "",
      quesText:'',
      details: {
        answers: []
      },
      comments: [],
      currentPage: 1
    };
  },
  methods: {
    moment,
    //展开评论
    showComment(item) {
      this.$set(item, "isShowComment", !item.isShowComment);
    },
    expandText(item) {
      this.$set(item, "isExpandText", !item.isExpandText);
    },
    closeText(item) {
      this.$set(item, "isExpandText", !item.isExpandText);
    },
    //点击头部菜单提问按钮
    question() {
      this.questionModal = true;
    },

    //获取回答数据
    getData() {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      return this.$axios
        .get("/answer/get", { params: { questionId: this.id } })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("isLoad", {
              isLoad: false
            });
            this.$set(this.details, "answers", res.data);
          }
        });
    },
    //提交回答
    writeAnswer() {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      this.$axios
        .post("/answer/write", {
          user: this.$store.state.user._id,
          questionId: this.id,
          content: this.quesContent,
          text:this.quesText,
        })
        .then(res => {
          if (res.status === 200) {
            this.$message.success("提交成功");
            return this.getData();
          }
        })
        .then(() => {
          //添加消息通知
          this.$axios
            .post("/message/create", {
              type: 3,
              fromUser: this.$store.state.user._id, //当前用户
              user: this.$store.state.questionCurrent.user._id, //关注的用户
              question: this.id
            })
            .then(res => {
              if (res.status === 200) {
                this.$store.commit("isLoad", {
                  isLoad: false
                });
              }
            });
        });
    },
    //回答内容提交
    async questionSend() {
      this.isClickEditor = !this.isClickEditor; //监听编辑器的状态   是否点击发布问题按钮
      await this.getEditorContent(); //直到获取编辑器最新内容更新才执行下一步
      if (!this.quesText.trim()) {
        this.$message.error("回答内容不能为空");
      } else {
        this.writeAnswer();
      }
    },

    //获取编辑器返回的文本内容
    getEditorContent(val) {
      this.quesContent = val.content;
      this.quesText = val.text;
    },

    //发布回答评论
    publishCommentRoot(param, answerId, questionId, i, userId) {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      //userId  当前评论用户
      //子组件传递参数通过父组件触发事件的arguments参数进行接收,该arguments是个参数数组 ,子组件传递参数为对象时,对应arguments[0]
      let { text } = param[0];
      this.$axios
        .post("/comment/root/publish", {
          user: this.$store.state.user._id, //当前的用户
          questionId,
          answerId,
          content: text
        })
        .then(async res => {
          if (res.status === 200) {
            await this.getComment(this.answerId, this.currentPage);
            await this.getData();
            this.$set(this.details.answers[i], "isShowComment", true); //保持评论处于展开状态
            this.$message.success("发布成功");
            //添加消息通知
            await this.$axios
              .post("/message/create", {
                type: 2,
                fromUser: this.$store.state.user._id, //当前用户
                user: userId, //评论的用户
                question: this.id
              })
              .then(res => {
                if (res.status === 200) {
                  this.$store.commit("isLoad", {
                    isLoad: false
                  });
                }
              });
          }
        });
    },
    //发布评论的评论
    publishCommentChild(param, i) {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      this.$axios
        .post("/comment/child/publish", {
          content: param[0].text,
          commentId: param[0].commentId,
          user: this.$store.state.user._id,
          userCommented: param[0].userId
        })
        .then(async res => {
          if (res.status === 200) {
            await this.getComment(this.answerId, this.currentPage);
            await this.getData();
            this.$set(this.details.answers[i], "isShowComment", true); //保持评论处于展开状态
            this.$message.success("发布成功");
            //添加消息通知
            await this.$axios
              .post("/message/create", {
                type: 2,
                fromUser: this.$store.state.user._id, //当前用户
                user: param[0].userId, //评论的用户
                question: this.id
              })
              .then(res => {
                if (res.status === 200) {
                  this.$store.commit("isLoad", {
                    isLoad: false
                  });
                }
              });
          }
        });
    },
    //获取评论内容
    getComment(id, currentPage) {
      this.comments = []; //数据清空
      this.answerId = id;
      return this.$axios
        .get("/comment/root/get", { params: { id, currentPage } })
        .then(res => {
          if (res.status === 200) {
            this.comments = res.data;
          }
        });
    },
    //评论分页查询
    commentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getComment(this.answerId, this.currentPage);
    }
  },
  watch: {
    //监听问题详情界面  问题回答面板是否显示
    "$store.state.questionModal"(val) {
      this.questionModal = val;
    },
    //监听路由参数改变  组件数据更新
    $route() {
      this.id = this.$route.query.id;
      this.getData();
    }
  },

  created() {
    this.getData();
  },

  components: { Comment, Editor }
};
</script>
<style scoped>
.left {
  width: 694px;
  margin-right: 10px;
  flex-shrink: 0;
  background-color: #fff;
}

/*头部*/
.left .left-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin: 0 20px;
  border-bottom: 1px solid #f6f6f6;
}
.left-head .left-head-left {
  font-size: 15px;
  font-weight: 600;
}
.left-head .left-head-right {
  color: #8590a6;
  margin-right: 10px;
  cursor: pointer;
}
.left-head-right-icon {
  margin-left: 10px;
}
/*身体*/
.left-body-item {
  padding: 16px 20px 0px;
}

.left-body-item::after {
  display: inline-block;
  content: "";
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
}
.left-body-item:nth-last-child(1)::after {
  border-bottom: none;
}
.left-body .left-body-user {
  display: flex;
  align-items: center;
}
.left-body-user .left-body-user-img img {
  width: 38px;
  height: 38px;
}
.left-body-user .left-body-user-text {
  margin-left: 14px;
}
.left-body-user-text .left-body-user-name {
  font-size: 15px;
  font-weight: 600;
}
.left-body-user-text .left-body-user-detail {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #646464;
}
.left-body .left-body-person {
  color: #8590a6;
  margin: 10px 0;
}
.left-body .left-body-content {
  line-height: 24px;
  font-size: 15px;
}
.left-body .left-body-content-expand {
  height: auto;
}
.left-body .left-body-content-close {
  /* 遮罩层 */
  mask-image: linear-gradient(#000, transparent);
  max-height: 100px;
}
.left-body .left-body-expand {
  color: #175199;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
}
.left-body .left-body-time {
  color: #8590a6;
  margin: 10px 0;
}

.left-body-actions .left-body-actions-up {
  margin-right: 5px;
}
.left-body-actions .left-body-actions-up {
  color: #0084ff;
  background-color: rgba(0, 132, 255, 0.1) !important;
  border: none;
}
.left-body-actions .left-body-actions-down {
  color: #0084ff;
  background-color: rgba(0, 132, 255, 0.1) !important;
  border: none;
}
.left-body .left-body-actions .left-body-actions-item {
  margin-right: 20px;
}
.left-body .left-body-actions .left-body-actions-icon {
  margin-right: 6px;
}
.left-body .left-body-actions .left-body-actions-text {
  color: #8590a6;
  cursor: pointer;
}
.left-body .left-body-actions .left-body-actions-close {
  float: right;
  line-height: 32px;
}

/*回答问题*/
.ques {
  width: 694px;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-right: 10px;
}
/*提问窗口*/
.ques-foot {
  display: flex;
  justify-content: space-between;
}
.ques-til {
  height: 40px;
  display: flex;
  margin-bottom: 10px;
}
.ques-til .ques-til-l {
  flex-shrink: 0;
  margin-right: 10px;
}
.ques-til .ques-til-l img {
  width: 40px;
  height: 40px;
}

.ques-des {
  margin: 10px 0;
}

/*编辑器*/

.editor >>> .ql-container {
  height: 200px;
}

/*暂无数据*/
.empty {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.empty .empty-icon {
  font-size: 40px;
  color: rgba(0, 0, 0, 0.3);
}
.empty .empty-text {
  margin-top: 20px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
}
</style>