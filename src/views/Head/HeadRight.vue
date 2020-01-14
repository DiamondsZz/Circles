<!-- 首页头部左边 -->
<template>
  <div class="head-content-right">
    <span class="head-content-right-info">
      <a-icon type="bell" theme="filled" class="head-icon" />
    </span>
    <span class="head-content-right-mes">
      <a-icon type="message" theme="filled" class="head-icon" />
    </span>
    <span class="head-content-right-user">
      <a-avatar icon="user"  :src="$store.state.user.userImg"/>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
</style>