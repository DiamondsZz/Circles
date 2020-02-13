<!--首页内容左边 -->
<template>
  <div class="body-left">
    <div class="message-list">
      <div class="message-head">通知中心</div>
      <div class="message-items">
        <div class="message-time">2012-8</div>
        <div class="message-item" v-for="(item,i) in data" :key="i">
          <div class="message-item-img">
            <img src="https://pic1.zhimg.com/v2-0bdcd6c43a2ecfe0dfbe72cc3cc3e83e_60w.png" alt />
          </div>
          <div class="message-item-text">
            <div
              class="message-item-user"
            >{{item.fromUser.userName}}{{item.type|filterMessage(item)}} · {{moment(item.createdTime).format("HH:mm:ss")}}</div>
            <div class="message-item-til" @click="showQuestion(item)">{{item.question.til}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      //回答数据
      data: []
    };
  },
  methods: {
    moment,
    //获取回答数据
    getData() {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      this.$axios
        .get("/message/all/get", { params: { id: this.$store.state.user._id } })
        .then(res => {
          if (res.status === 200) {
            this.data = res.data;
            this.$store.commit("isLoad", {
              isLoad: false
            });
          }
        });
    },
    //进入问题页面
    showQuestion(message) {
      if (this.$route.query.id !== message.question._id) {
        this.$router.push({
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
  created() {
    this.getData();
  },
  components: {}
};
</script>
<style scoped>
/*内容左边部分*/
.body .body-left {
  width: 694px;
  height: 100%;
  background-color: #fff;
  margin-right: 10px;
}
.message-head {
  border-bottom: 1px solid #ebebeb;
  padding: 0 24px;
  height: 64px;
  line-height: 64px;
  font-size: 19px;
  font-weight: 600;
  color: #1a1a1a;
}
.message-items {
  padding: 24px 32px 0;
  margin-bottom: 20px;
}
.message-time {
  font-size: 14px;
  font-weight: 600;
  color: #444;
}
.message-item {
  display: flex;
  position: relative;
  padding: 20px 0px;
}
.message-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  height: 1px;
  background-color: #ebeef5;
}
.message-item-img img {
  display: flex;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-right: 12px;
  margin-top: 3px;
}
.message-item-user {
  font-size: 13px;
  color: grey;
}
.message-item-til {
  font-size: 14px;
  margin-top: 4px;
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
}
</style>