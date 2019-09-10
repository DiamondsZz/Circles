<!--文章详情 -->
<template>
  <div class="details" @wheel="wheel">
    <circles-head :isScrollDown="isScrollDown" :isFixedTop="isFixedTop"></circles-head>
  </div>
</template>

<script>
import CirclesHead from "../Head/Head";
export default {
  data() {
    return { isScrollDown: false, isFixedTop: false };
  },
  methods: {
    //鼠标滑轮滚动事件
    wheel(e) {
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
    },

    //滚动条事件
    scroll() {
      //顶部滚动高度                     //窗口高度    //滚动内容高度
      let scrollTop, scrollTopCurrent, clientHeight, scrollHeight;
      window.onscroll = e => {
        scrollTopCurrent =
          document.documentElement.scrollTop || document.body.scrollTop;
        //console.log(scrollTopCurrent);
        if (scrollTopCurrent > 20) {
          this.isFixedTop = true;
        } else {
          this.isFixedTop = false;
        }
      };
    }
  },
  created() {
    console.log(this)
  },
  mounted() {
    this.scroll();
  },
  components: { CirclesHead }
};
</script>
<style scoped>
.details {
  height: 1000px;
}
</style>