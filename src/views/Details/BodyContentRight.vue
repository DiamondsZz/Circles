<!-- 文章详情内容身体   右-->
<template>
  <div class="right">
    <div class="right-user">
      <div class="right-user-head">关于作者</div>
      <div class="right-user-body">
        <div class="right-user-body-head">
          <span class="right-user-body-head-img">
            <img :src="questionCurrent.user&&questionCurrent.user.userImg" alt />
          </span>
          <span
            class="right-user-body-head-name"
          >{{questionCurrent.user&&questionCurrent.user.userName}}</span>
        </div>
        <div class="right-user-body-des">
          <span class="right-user-body-des-item">
            <span class="right-user-body-des-til">回答</span>
            <span class="right-user-body-des-text">{{user.answerCount}}</span>
          </span>
          <span class="right-user-body-des-item">
            <span class="right-user-body-des-til">文章</span>
            <span class="right-user-body-des-text">{{user.questionCount}}</span>
          </span>
          <span class="right-user-body-des-item">
            <span class="right-user-body-des-til">关注者</span>
            <span class="right-user-body-des-text">{{user.followCount}}</span>
          </span>
        </div>
        <div class="right-user-body-action">
          <a-button
            class="right-user-body-btn"
            :type="user.isFollow?'default':'primary'"
            @click="followUser"
          >
            <span v-if="user.isFollow">已关注</span>
            <span v-else>关注他</span>
          </a-button>
        </div>
      </div>
    </div>
    <div class="right-question">
      <div class="right-question-head">相关问题</div>
      <div class="right-question-body" v-if="question.length>0">
        <div
          class="right-question-body-item"
          v-for="(item,i) in question"
          :key="i"
          @click="showQuestion(item)"
        >
          {{item.til}}
          <span class="right-question-body-answer">{{item.question_answer.length}}个回答</span>
        </div>
      </div>
      <div class="empty" v-else>
        <a-icon type="frown" theme="filled" class="empty-icon" />
        <p class="empty-text">该问题还没有相关推荐哦</p>
      </div>
    </div>
    <div class="right-recommend">
      <div class="right-recommend-head">相关推荐</div>
      <div class="right-recommend-body">
        <div class="right-recommend-body-item">
          <div class="right-recommend-body-img">
            <img src="https://pic4.zhimg.com/90/v2-6956ae2f9652788ac6a67529b8d515b5_250x0.jpg" alt />
          </div>
          <div class="right-recommend-body-inf">
            <div class="right-recommend-body-top">千年雄安：颠覆性技术、前沿产业与未来之都</div>
            <div class="right-recommend-body-bottom">
              <span class="right-recommend-body-bottom-person">29 人读过</span>
              <span class="right-recommend-body-bottom-read">
                <a-button icon="caret-up">阅读</a-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: [],
      questionCurrent: {},
      user: {}
    };
  },
  methods: {
    getQuestions() {
      this.$axios
        .post("/question/relative/get", {
          type: this.questionCurrent.type,
          id: this.$route.query.id
        })
        .then(res => {
          if (res.status === 200) {
            this.question = res.data;
          }
        });
    },
    //进入问题页面
    showQuestion(item) {
      if (this.$route.query.id !== item._id) {
        this.$router.push({
          path: "details",
          query: { id: item._id }
        });
      }
    },
    getUser() {
      this.$axios
        .post("/user/get", {
          userId: this.questionCurrent.user._id,
          fromUser: this.$store.state.user._id
        })
        .then(res => {
          if (res.status === 200) {
            this.user = res.data;
          }
        });
    },
    followUser() {
      this.$axios
        .post("/follow/user", {
          user: this.questionCurrent.user._id,
          fromUser: this.$store.state.user._id
        })
        .then(res => {
          if (res.status === 200) {
            this.getUser();
            if (res.data.isFollow) {
              this.$message.success("关注成功");
            } else {
              this.$message.success("取消成功");
            }
          }
        });
    }
  },
  watch: {
    "$store.state.questionCurrent"(question) {
      this.questionCurrent = question;
      this.getQuestions();
      this.getUser();
    }
  },
  created() {},
  components: {}
};
</script>
<style scoped>
.right {
  width: 296px;
}

/*关于作者*/
.right-user {
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.right-user .right-user-head {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #f6f6f6;
}
.right-user .right-user-body {
  padding: 16px 20px 0px;
}
.right-user .right-user-body .right-user-body-head {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-user-body .right-user-body-head .right-user-body-head-img img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
.right-user-body .right-user-body-head .right-user-body-head-name {
  font-size: 20px;
  font-weight: 600;
}
.right-user-body .right-user-body-des {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.right-user-body .right-user-body-des .right-user-body-des-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right-user-body-des .right-user-body-des-til {
  color: #8590a6;
}
.right-user-body-des .right-user-body-des-text {
  font-size: 18px;
  font-weight: 600;
}
.right-user-body .right-user-body-action {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 14px;
}
.right-user-body .right-user-body-action .right-user-body-btn {
  width: 120px;
  height: 32px;
}
/*相关问题*/
.right-question {
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.right-question .right-question-head {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #f6f6f6;
}
.right-question .right-question-body {
  padding: 16px 20px 0px;
}
.right-question .right-question-body .right-question-body-item {
  margin-bottom: 16px;
  color: #175199;
  cursor: pointer;
}
.right-question-body .right-question-body-item .right-question-body-answer {
  float: right;
  color: #8590a6;
}

/*相关推荐*/
.right-recommend {
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.right-recommend .right-recommend-head {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #f6f6f6;
}
.right-recommend .right-recommend-body {
  padding: 16px 20px;
}
.right-recommend-body-item {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #f6f6f6;
}

.right-recommend-body-item .right-recommend-body-img img {
  width: 80px;
  height: 64px;
  border-radius: 3px;
  margin-right: 8px;
  object-fit: cover;
}
.right-recommend-body-inf {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right-recommend-body-inf .right-recommend-body-top {
  width: 165px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
.right-recommend-body-inf .right-recommend-body-bottom {
  display: flex;
  justify-content: space-between;
}
.right-recommend-body-bottom-person {
  color: #8590a6;
}
.right-recommend-body-bottom-read >>> .ant-btn {
  padding: 0px 6px;
  height: auto;
  color: #fff;
  background: #0084ff;
}
.right-recommend-body-bottom-read >>> .ant-btn span {
  margin-left: 0;
}

/*暂无数据*/
.empty {
  height: 200px;
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