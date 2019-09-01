<template>
  <div class="head">
    <div class="head-content">
      <div class="head-content-left">
        <div class="head-content-left-logo">Logo</div>
        <div class="head-content-left-menu">
          <div class="head-content-left-menu-item">
            <span>首页</span>
          </div>
          <div class="head-content-left-menu-item">发现</div>
          <div class="head-content-left-menu-item">等你来答</div>
        </div>
        <div class="head-content-left-action">
          <a-input-search
            class="head-content-left-search"
            :class="{'head-content-left-search-focus':!quesBtn}"
            @change="search"
            @focus="focus"
            @blur="blur"
          />
          <transition name="head-content-left-question">
            <a-button class="head-content-left-question" type="primary" v-if="quesBtn">提问</a-button>
          </transition>
        </div>

        <div></div>
      </div>
      <div class="head-content-right">
        <span class="head-content-right-info">
          <a-icon type="bell" theme="filled" style="fontSize:22px;" />
        </span>
        <span class="head-content-right-mes">
          <a-icon type="message" theme="filled" style="fontSize:22px;" />
        </span>
        <span class="head-content-right-user">
          <a-avatar icon="user" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quesBtn: true
    };
  },
  methods: {
    //搜索框进行搜索
    search() {
      console.log(11);
    },
    //搜索框聚焦
    focus() {
      this.quesBtn = false;
    },
    blur() {
      this.quesBtn = true;
    }
  },
  created() {
    console.log(this.$message);
  }
};
</script>

<style scoped>
.head {
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.head-content {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
  height: 52px;
}
.head-content-left {
  display: flex;
}
.head-content-left-logo {
  display: flex;
  align-items: center;
}
.head-content-left-menu {
  display: flex;
  margin: 0 23px;
}
.head-content-left-menu .head-content-left-menu-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #8590a6;
  font-weight: 600;
  padding: 0px 17px;
}
.head-content-left-action {
  display: flex;
  align-items: center;
}
.head-content-left-search {
  width: 326px;
  transition: width .5s;
}
.head-content-left-search-focus {
  width: 400px;
}
.head-content-left-search >>> .ant-input {
  background-color: #f6f6f6;
}
.head-content-left-search >>> .ant-input-search-icon {
  font-size: 18px;
}
.head-content-left-question {
  margin-left: 16px;
}
.head-content-left-question-enter,
.head-content-left-question-leave-to {
  transform: scale(0);
}
.head-content-left-question-enter-active,
.head-content-left-question-leave-active {
  transition: all 0.2s;
}
.head-content-left-question  {
  padding: 0 10px;
}
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
}
</style>