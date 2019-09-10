<!--首页头部-->
<template>
  <div class="head">
    <div class="head-content" :class="{'up-scroll':downScroll}">
      <head-left></head-left>
      <head-right></head-right>
    </div>
    <div class="head-details" :class="{'down-scroll':downScroll}" >
      <div class="head-details-til">从你的经历来看，什么时候感到做一个中国人很幸福？</div>
      <div class="head-details-btn">
        <a-button class="head-details-btn-item" type="primary">关注问题</a-button>
        <a-button class="head-details-btn-item" type="primary" ghost icon="edit">写回答</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeadLeft from "./HeadLeft";
import HeadRight from "./HeadRight";
export default {
  props: ["isScrollDown"],
  data() {
    return {
      downScroll: false
    };
  },
  methods: {},
  watch: {
    isScrollDown(downScroll) {
      console.log(downScroll);
      this.downScroll = downScroll;
    }
  },
  created() {},
  components: {
    HeadLeft,
    HeadRight
  }
};
</script>

<style scoped>
/*首页头部*/
.head {
  min-width: 1000px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
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
.down-scroll {
  transform: translateY(-100%);
}
.up-scroll {
  transform: translateY(100%);
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
</style>