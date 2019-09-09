<!--首页头部-->
<template>
  <div class="head">
    <div class="head-content">
      <head-left></head-left>
      <head-right></head-right>
    </div>
  </div>
</template>

<script>
import HeadLeft from "./HeadLeft";
import HeadRight from "./HeadRight";
export default {
  data() {
    return {};
  },
  methods: {},

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
}
</style>