<!--文章详情 -->
<template>
  <div class="details" @wheel="wheel">
    <circles-head :isScrollDown="isScrollDown" :isFixedTop="isFixedTop"></circles-head>
    <details-body :isFixedTop="isFixedTop"></details-body>
  </div>
</template>

<script>
import CirclesHead from "../Head/Head";
import DetailsBody from "./Body";
export default {
  data() {
    return {
      //当前滚动距离顶部高度
      scrollTopCurrent: 0,
      //鼠标滑轮是否向下滚动
      isScrollDown: false,
      //头部是否吸顶
      isFixedTop: false
    };
  },
  methods: {
    //鼠标滑轮滚动事件
    wheel(e) {
      if (this.scrollTopCurrent > 20) {
        //向上滚动
        if (e.wheelDelta > 0) {
          //console.log("向上滚动");
          this.isScrollDown = false;
        }
        //向下滚动
        else if (e.wheelDelta < 0) {
          //console.log("向下滚动");
          this.isScrollDown = true;
        }
      }
    },

    //滚动条事件
    scroll() {
      //顶部滚动高度   //窗口高度    //滚动内容高度
      let scrollTop, clientHeight, scrollHeight;
      window.onscroll = e => {
        this.scrollTopCurrent =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (this.scrollTopCurrent > 20) {
          this.isFixedTop = true;
        } else {
          this.isFixedTop = false;
        }
      };
    }
  },

  created() {},
  mounted() {
    this.scroll();
  },
  components: { CirclesHead, DetailsBody }
};
</script>
<style scoped>
.details {
  height: 1000px;
}
</style>