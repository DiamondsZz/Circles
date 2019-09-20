<!--文章详情内容部分-->
<template>
  <div class="details-body" :class="{'is-fixed-top':isFixedTop}">
    <body-head></body-head>
    <body-content></body-content>
  </div>
</template>

<script>
import BodyHead from "./BodyHead";
import BodyContent from "./BodyContent";
export default {
  props: ["isFixedTop"],
  data() {
    return {
      isFixed: false
    };
  },
  methods: {},
  watch: {
    isFixedTop(isFixedTop) {
      this.isFixed = isFixedTop;
    }
  },
  created() {},
  components: { BodyHead, BodyContent }
};
</script>
<style scoped>
/*头部吸顶*/
.is-fixed-top {
  margin-top: 69px; /*滚动条宽度17px*/
}
</style>