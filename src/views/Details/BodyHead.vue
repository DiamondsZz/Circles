<!--文章详情内容头部-->
<template>
  <div class="details-head">
    <div class="details-body-head">
      <div class="details-body-head-content">
        <div class="details-body-head-content-left">
          <div
            class="details-body-head-content-left-tags"
            v-if="this.$store.state.questionCurrent.type&&this.$store.state.questionCurrent.type.length>0"
          >
            <a-tag
              color="blue"
              v-for="(item,i) in this.$store.state.questionCurrent.type"
              :key="i"
            >{{item}}</a-tag>
          </div>
          <div class="details-body-head-content-left-til">{{this.$store.state.questionCurrent.til}}</div>
          <div
            class="details-body-head-content-left-short"
            :class="{'details-body-head-content-left-short-expand':this.$store.state.questionCurrent.isShowTotal,'details-body-head-content-left-short-close':!this.$store.state.questionCurrent.isShowTotal}"
          >
            <span class="details-body-head-content-left-short-text">{{detailsContent}}</span>
            <span
              type="link"
              class="details-body-head-content-left-short-btn"
              v-if="!this.$store.state.questionCurrent.isShowTotal&&detailsContent&&detailsContent.length>=80"
              @click="showTotal"
            >
              显示全部
              <a-icon class="details-body-head-content-left-short-btn-icon" type="down" />
            </span>
          </div>
        </div>
        <div class="details-body-head-content-right">
          <div class="details-body-head-content-right-item">
            <span class="details-body-head-content-right-item-til">关注者</span>
            <span
              class="details-body-head-content-right-item-text"
            >{{this.$store.state.questionCurrent.follower}}</span>
          </div>
          <div class="details-body-head-content-right-item">
            <span class="details-body-head-content-right-item-til">被浏览</span>
            <span
              class="details-body-head-content-right-item-text"
            >{{this.$store.state.questionCurrent.looked}}</span>
          </div>
        </div>
      </div>
      <div class="details-body-head-actions">
        <a-button
          :type="this.$store.state.questionCurrent.isFollow?'default':'primary'"
          class="details-body-head-actions-item details-body-head-actions-btn"
          @click="followQuestion"
        >{{this.$store.state.questionCurrent.isFollow?"已关注":"关注问题"}}</a-button>
        <a-button
          type="primary"
          ghost
          class="details-body-head-actions-item details-body-head-actions-btn"
          @click="writeAnswer"
        >
          <a-icon type="edit" />写回答
        </a-button>
        <a-button
          class="details-body-head-actions-item details-body-head-actions-btn"
          @click="invitAnswer"
        >
          <a-icon type="team" />邀请回答
        </a-button>
        <span
          class="details-body-head-actions-item details-body-head-actions-comment"
          @click="showComment"
        >
          <a-icon class="details-body-head-actions-icon" type="message" theme="filled" />
          {{comment.commentContent&&comment.commentContent.length}}条评论
        </span>
        <span class="details-body-head-actions-item details-body-head-actions-share">
          <a-icon class="details-body-head-actions-icon" type="rocket" theme="filled" />分享
        </span>
        <span
          class="details-body-head-actions-item details-body-head-actions-up"
          v-if="this.$store.state.questionCurrent.isShowTotal"
          @click="closeTotal"
        >
          <a-icon class="details-body-head-actions-icon" type="up" />收起
        </span>
      </div>
    </div>

    <!--评论面板 -->
    <a-modal
      :width="700"
      :visible="comment.commentVisible"
      :bodyStyle="{'padding-top':'40px'}"
      :footer="null"
      @cancel="comment.commentVisible=false"
    >
      <comment
        :isExpand="true"
        :comment="comment.commentContent"
        :commentTotal="comment.commentContent&&comment.commentContent.length"
      ></comment>
    </a-modal>

    <!--邀请回答面板 -->
    <a-modal
      :width="700"
      :visible="invitVisible"
      title="你可以邀请下面用户，快速获得回答"
      :footer="null"
      @cancel="invitVisible=false"
    >
      <div class="user-invit" v-for="(item,i) in inviteUsers" :key="i">
        <div class="user-invit-left">
          <span class="user-invite-img">
            <img :src="item.userImg" alt />
          </span>
          <span class="user-invite-name">{{item.userName}}</span>
        </div>
        <div class="user-invit-right">
          <a-button @click="$message.error('目前暂不支持该功能！')">邀请回答</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  data() {
    return {
      invitVisible: false, //邀请回答面板
      id: this.$route.query.id,
      comment: {
        commentVisible: false,
        commentContent: []
      },
      inviteUsers: []
    };
  },
  methods: {
    getData() {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      return this.$axios
        .get("/question/details", {
          params: { questionId: this.id, userId: this.$store.state.user._id }
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("isLoad", {
              isLoad: false
            });
            let details = res.data;
            details.isShowTotal = false;
            this.$store.commit("questionCurrent", { question: details });       
          }
        });
    },
    //显示全部
    showTotal() {
      let question = JSON.parse(
        JSON.stringify(this.$store.state.questionCurrent)
      );
      question.isShowTotal = true;
      this.$store.commit("questionCurrent", { question });
    },
    closeTotal() {
      let question = JSON.parse(
        JSON.stringify(this.$store.state.questionCurrent)
      );
      question.isShowTotal = false;
      this.$store.commit("questionCurrent", { question });
    },
    showComment() {
      this.$set(this.comment, "commentVisible", true);
    },
    //写回答
    writeAnswer() {
      this.$store.commit("questionModal", {
        questionModal: !this.$store.state.questionModal
      });
    },
    //关注问题
    followQuestion() {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      this.$axios
        .post("/follow/question", {
          question: this.id,
          user: this.$store.state.user._id
        })
        .then(res => {
          if (res.status === 200) {
            return this.getData();
          }
        })
        .then(() => {
          this.$axios
            .post("/message/create", {
              type: this.$store.state.questionCurrent.isFollow ? 1 : 0,
              fromUser: this.$store.state.user._id, //当前用户
              user: this.$store.state.questionCurrent.user._id, //关注的用户
              question: this.id
            })
            .then(res => {
              if (res.status === 200) {
                this.$store.commit("isLoad", {
                  isLoad: false
                });
                if (this.$store.state.questionCurrent.isFollow) {
                  this.$message.success("关注成功");
                } else {
                  this.$message.success("取消成功");
                }
              }
            });
        });
    },
    //邀请回答
    invitAnswer() {
      this.invitVisible = true;
      this.$axios
        .get("/answer/invite", { params: { questionId: this.id } })
        .then(res => {
          if (res.status === 200) {
            this.inviteUsers = res.data;
          }
        });
    }
  },
  computed: {
    //问题详情
    detailsContent() {
      let question = JSON.parse(
        JSON.stringify(this.$store.state.questionCurrent)
      );
      if (question.isShowTotal) {
        return question.content.replace(new RegExp("<.+?>", "g"), "");
      } else {
        return question.content
          .replace(new RegExp("<.+?>", "g"), "")
          .substring(0, 80);
      }
    }
  },
  watch: {
    $route() {
      this.id = this.$route.query.id;
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  components: { Comment }
};
</script>
<style scoped>
.details-head {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
/*文章详情头部*/
.details-body-head {
  width: 1000px;
  margin: 0 auto;
  padding: 16px;
  background-color: #fff;
}

.details-body-head-content {
  display: flex;
  justify-content: space-between;
}

/*文章详情头部左边*/
.details-body-head-content .details-body-head-content-left {
  width: 694px;
  flex-shrink: 0; /*伸缩量*/
}
.details-body-head-content .details-body-head-content-left-tags >>> .ant-tag {
  padding: 0 12px;
  height: 30px;
  line-height: 26px;
  border-radius: 100px;
}
.details-body-head-content-left .details-body-head-content-left-til {
  margin-top: 12px;
  margin-bottom: 4px;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
}
.details-body-head-content-left-short-close {
  overflow: hidden;
  max-height: 50px;
}
.details-body-head-content-left-short-expand {
  height: auto;
}
.details-body-head-content-left-short
  .details-body-head-content-left-short-text {
  font-size: 15px;
  line-height: 25px;
}
.details-body-head-content-left-short
  .details-body-head-content-left-short-btn {
  color: #8590a6;
  margin-left: 10px;
  cursor: pointer;
}
.details-body-head-content-left-short-btn >>> .ant-btn {
  padding: 0;
}
.details-body-head-content-left-short-btn >>> .ant-btn > .anticon + span {
  margin-left: 4px;
}
.details-body-head-content-left-short-btn-icon {
  font-size: 10px;
}
/*文章详情头部右边*/
.details-body-head-content .details-body-head-content-right {
  width: 296px;
  display: flex;
  justify-content: flex-end;
}
.details-body-head-content-right .details-body-head-content-right-item {
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.details-body-head-content-right
  .details-body-head-content-right-item:nth-child(1) {
  border-right: 1px solid #ebebeb;
}
.details-body-head-content-right-item
  .details-body-head-content-right-item-til {
  color: #8590a6;
}
.details-body-head-content-right-item
  .details-body-head-content-right-item-text {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 800;
}
/*文章详情头部按钮*/
.details-body-head-actions {
  margin-top: 4px;
}
.details-body-head-actions .details-body-head-actions-item {
  margin-right: 16px;
}
.details-body-head-actions .details-body-head-actions-icon {
  margin-right: 4px;
}
.details-body-head-actions .details-body-head-actions-comment,
.details-body-head-actions .details-body-head-actions-share,
.details-body-head-actions .details-body-head-actions-up {
  color: #8590a6;
  cursor: pointer;
}

/*邀请回答面板*/
.user-invit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  padding: 14px 0;
}
.user-invite-img img {
  width: 30px;
  border-radius: 30px;
}
.user-invite-name {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
</style>