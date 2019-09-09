<template>
  <div id="app">
    <circles-head></circles-head>
    <router-view></router-view>
  </div>
</template>
<script>
import CirclesHead from "./views/Head/Head";
export default {
  name: "app",
  components: { CirclesHead }
};
</script>

<style scoped>
</style>>
