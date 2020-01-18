<!-- 首页头部左边 -->
<template>
  <div class="head-content-right">
    <span class="head-content-right-info">
      <a-popover placement="bottom">
        <template slot="content">
          <p v-for="(item,i) in message" :key="i">
            <span class="messageUser">{{item.fromUser.userName}}</span>
            {{item.type|filterMessage(item)}}
          </p>
        </template>
        <template slot="title">
          <span>最新消息通知</span>
        </template>
        <a-badge :count="message.length" @click="messageLook">
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
  props: ["message"],
  data() {
    return {};
  },
  methods: {
    messageLook() {}
  },
  filters: {
    filterMessage(type, item) {
      switch (type) {
        case 0:
          return `对你取消了关注`;
          break;
        case 1:
          return `关注了你`;
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
  watch: {},
  created() {},
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
.messageUser {
  color: #175199;
}
</style>