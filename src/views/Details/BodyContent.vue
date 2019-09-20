<!-- 文章详情内容身体 -->
<template>
  <div class="content">
    <content-left></content-left>
    <content-right></content-right>
  </div>
</template>

<script>
import ContentLeft from "./BodyContentLeft";
import ContentRight from "./BodyContentRight";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: { ContentLeft, ContentRight }
};
</script>
<style scoped>
.content{
  width:1030px;
  margin: 10px auto;
  padding:0 10px;
  display: flex;
}
</style>