<!--首页内容-->
<template>
  <div class="body">
    <body-left></body-left>
    <body-right></body-right>
  </div>
</template>

<script>
import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    BodyLeft,
    BodyRight
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
