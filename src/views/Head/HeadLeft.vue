<!-- 首页头部左边 -->
<template>
  <div class="head-content-left">
    <div class="head-content-left-logo"></div>
    <div class="head-content-left-menu">
      <div
        v-for="(item,i) in menus"
        :key="i"
        class="head-content-left-menu-item"
        @click="menuClick(item)"
      >
        <span :class="{'head-content-left-menu-item-active':item===menuCurrent}">{{item}}</span>
      </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前路由的路径
      routeName: this.$route.meta.name,
      //提问按钮显示与否
      quesBtn: true,
      //导航菜单
      menus: ["首页","发现","等你来答"]
    };
  },
  methods: {
    //路由调用
    router(path) {
      this.$router.push(path);
    },
    //搜索框进行搜索
    search() {},
    //搜索框聚焦
    focus() {
      this.quesBtn = false;
    },
    //搜索框失去焦点
    blur() {
      this.quesBtn = true;
    },

    menuClick(menu) {
      this.menuCurrent = menu;
      switch (menu) {
        case "首页":
          this.router("/");
          break;
        case "发现":
          this.router("/find");
          break;
        case "等你来答":
          this.router("/answer");
          break;
        default:
          this.router("/");
      }
    }
  },

  computed: {
    //当前导航菜单选项
    menuCurrent() {
      return this.routeName;
    }
  },
  created() {
    //console.log(this);
  },
  components: {}
};
</script>
<style scoped>
/*头部左边*/
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
  padding: 0px 17px;
  cursor: pointer;
}
.head-content-left-menu .head-content-left-menu-item-active {
  position: relative;
  color: #444;
  padding: 14px 0;
  font-weight: 600;
}
.head-content-left-menu .head-content-left-menu-item-active::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  height: 3px;
  background-color: #0084ff;
}
.head-content-left-action {
  display: flex;
  align-items: center;
}
.head-content-left-search {
  width: 326px;
  transition: width 0.5s;
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
/*提问按钮显示隐藏动画*/
.head-content-left-question {
  margin-left: 16px;
  padding: 0 10px;
}
.head-content-left-question-enter,
.head-content-left-question-leave-to {
  transform: scale(0);
}
.head-content-left-question-enter-active,
.head-content-left-question-leave-active {
  transition: all 0.2s;
}
</style>