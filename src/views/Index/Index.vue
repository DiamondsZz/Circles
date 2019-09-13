<template>
  <div class>
    <circles-head></circles-head>
    <router-view></router-view>
  </div>
</template>

<script>
import CirclesHead from "../Head/Head";

export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: { CirclesHead }
};
</script>
<style scoped>
</style>