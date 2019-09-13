<!--首页内容-->
<template>
  <div class="body">
    <index-left></index-left>
    <index-right></index-right>
  </div>
</template>

<script>
import IndexLeft from "./IndexLeft";
import IndexRight from "./IndexRight";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    IndexLeft,
    IndexRight
  }
};
</script>

<style scoped>
.body {
  width: 1030px;
  padding: 0 16px;
  margin: 10px auto;
  display: flex;
}
</style>
