<!-- 首页头部左边 -->
<template>
  <div class="head-content-right">
    <span class="head-content-right-info">
      <a-popover placement="bottom">
        <template slot="content">
          <div v-if="message.length>0">
            <p v-for="(item,i) in messages" :key="i">
              <span class="message-user">{{item.fromUser&&item.fromUser.userName}}</span>
              <span class="message-info">{{item.type|filterMessage(item)}}</span>
              <span
                class="message-question"
                v-if="item.type!==2"
                @click="showQuestion(item)"
              >{{item.question.til}}</span>
            </p>
            <div class="message-more">查看更多</div>
          </div>
          <div v-else>暂无最新消息</div>
        </template>
        <template slot="title">
          <span>最新消息通知</span>
        </template>
        <a-badge :count="messagesCount" @click="messageLook">
          <a-icon type="bell" theme="filled" class="head-icon" />
        </a-badge>
      </a-popover>
    </span>
    <span class="head-content-right-mes">
      <a-icon type="message" theme="filled" class="head-icon" />
    </span>
    <span class="head-content-right-user">
      <a-avatar icon="user" :src="$store.state.user.userImg" />
    </span>
  </div>
</template>

<script>
export default {
  props: ["message", "messageCount"],
  data() {
    return {
      messages: [],
      messagesCount: 0
    };
  },
  methods: {
    //查看消息
    messageLook() {
      if (this.message.length > 0) {
        this.$store.commit("isLoad", {
          isLoad: true
        });
        let message = this.message.map(item => {
          return item._id;
        });

        this.$axios
          .post("/message/look", {
            message
          })
          .then(res => {
            if (res.status === 200) {
              this.$emit("mesLook"); //通知父组件  用户点击了消息通知
              this.$store.commit("isLoad", {
                isLoad: false
              });
            }
          });
      }
    },
    //进入问题页面
    showQuestion(message) {
      console.log(this.$route);
      if (this.$route.query.id !== message.question._id) {
        this.$router.replace({
          path: "details",
          query: { id: message.question._id }
        });
      }
    }
  },
  filters: {
    filterMessage(type, item) {
      switch (type) {
        case 0:
          return `取消关注了你的问题`;
          break;
        case 1:
          return `关注了你的问题`;
          break;
        case 2:
          return `评论了你`;
          break;
        case 3:
          return `回答了你的问题`;
          break;
        case 4:
          return `邀请你回答`;
          break;
      }
    }
  },
  watch: {
    //监听消息通知的改变
    message(val) {
      this.messages = val;
    },
    messageCount(val) {
      this.messagesCount = val;
    }
  },
  created() {
    this.messages = this.message;
    this.messagesCount = this.messageCount;
  },
  components: {}
};
</script>
<style scoped>
/*头部右边*/
.head-content-right {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
.head-content-right .head-content-right-info,
.head-content-right .head-content-right-mes,
.head-content-right .head-content-right-user {
  margin-left: 40px;
  cursor: pointer;
}
.head-icon {
  font-size: 22px;
  color: #8590a6;
}
.message-user {
  color: #175199;
  cursor: pointer;
}
.message-info {
}
.message-question {
  color: #175199;
  cursor: pointer;
}
.message-more {
  padding: 10px 0;
  border-top: 1px dashed #8590a6;
  text-align: center;
  cursor: pointer;
}
</style>