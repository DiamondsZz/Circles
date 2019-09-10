<!--文章详情 -->
<template>
  <div class @wheel="wheel">
    <circles-head :isScrollDown="isScrollDown"></circles-head>
  </div>
</template>

<script>
import CirclesHead from "../Head/Head";
export default {
  data() {
    return { isScrollDown: false };
  },
  methods: {
    wheel(e) {
      //向上滚动
      if (e.wheelDelta > 0) {
        console.log("向上滚动");
        this.isScrollDown = false;
      }
      //向下滚动
      else if (e.wheelDelta < 0) {
        console.log("向下滚动");
        this.isScrollDown = true;
      }
    }
  },
  created() {},
  components: { CirclesHead }
};
</script>
<style scoped>
</style>