<!--首页头部-->
<template>
  <div class="head" :class="{'head-fixed':fixedTop}">
    <div class="head-content" :class="{'up-scroll':downScroll}">
      <head-left></head-left>
      <head-right :message="message" @mesLook="lookMessage" :messageCount="messageCount"></head-right>
    </div>

    <div class="head-details" :class="{'down-scroll':downScroll}">
      <div class="head-details-til">{{this.$store.state.questionCurrent.til}}</div>
      <div class="head-details-btn">
        <a-button
          :type="this.$store.state.questionCurrent.isFollow?'default':'primary'"
          class="details-body-head-actions-item details-body-head-actions-btn"
          @click="followQuestion"
        >{{this.$store.state.questionCurrent.isFollow?"已关注":"关注问题"}}</a-button>
        <a-button
          class="head-details-btn-item"
          type="primary"
          ghost
          icon="edit"
          @click="writeAnswer"
        >写回答</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeadLeft from "./HeadLeft";
import HeadRight from "./HeadRight";
export default {
  //isScrollDown:鼠标滑轮是否向下滑动
  //isFixedTop:头部是否固定
  props: ["isScrollDown", "isFixedTop"],
  data() {
    return {
      downScroll: false,
      fixedTop: false,
      message: [], //消息数
      messageCount:0,
    };
  },
  methods: {
    //获取消息通知
    getMessage() {
      this.$axios
        .get("/message/get", { params: { id: this.$store.state.user._id } })
        .then(res => {
          if (res.status === 200) {
            this.message = res.data.messages;
            this.messageCount=res.data.count;
          }
        });
    },
    //写回答
    async writeAnswer() {
      await this.$store.commit("questionModal", {
        questionModal: !this.$store.state.questionModal
      });
      //回到顶部  显示回答提交框
      document.documentElement.scrollTop = 200;
    },
    getData() {
      return this.$axios
        .get("/question/details", {
          params: {
            questionId: this.$store.state.questionCurrent._id,
            userId: this.$store.state.user._id
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("questionCurrent", { question: res.data });
          }
        });
    },
    //关注问题
    followQuestion() {
      this.$axios
        .post("/follow/question", {
          question: this.$store.state.questionCurrent._id,
          user: this.$store.state.user._id
        })
        .then(res => {
          if (res.status === 200) {
            return this.getData();
          }
        })
        .then(() => {
          //添加消息通知
          this.$axios
            .post("/message/create", {
              type: this.$store.state.questionCurrent.isFollow ? 1 : 0,
              fromUser: this.$store.state.user._id, //当前用户
              user: this.$store.state.questionCurrent.user._id, //关注的用户
              question: this.id
            })
            .then(res => {
              if (res.status === 200) {
                if (this.$store.state.questionCurrent.isFollow) {
                  this.$message.success("关注成功");
                } else {
                  this.$message.success("取消成功");
                }
              }
            });
        });
    },
    //接受子组件消息通知点击回调
    lookMessage() {
      this.getMessage();
    }
  },
  watch: {
    isScrollDown(downScroll) {
      this.downScroll = downScroll;
    },
    isFixedTop(fixedTop) {
      this.fixedTop = fixedTop;
    }
  },
  created() {
    this.getMessage();
  },
  components: {
    HeadLeft,
    HeadRight
  }
};
</script>

<style scoped>
/*首页头部*/
.head {
  position: relative;
  min-width: 1000px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  height: 52px;
  overflow: hidden;
}
.head-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.head-content {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
  height: 52px;
  transition: transform 1.3s;
}
.head-details {
  width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 1.3s;
}
.head-details .head-details-til {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
}
.head-details-btn {
  padding-right: 20px;
}
.head-details-btn .head-details-btn-item {
  margin: 0 8px;
}
/*鼠标滑轮滚动事件*/
.down-scroll {
  transform: translateY(-100%);
}
.up-scroll {
  transform: translateY(100%);
}
</style>