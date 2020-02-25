<template>
  <div id="app">
    <router-view></router-view>
    <loading :visible="$store.state.isLoad"></loading>
  </div>
</template>
<script>
import Loading from "@/components/Loading";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
#app {
  height:100%;
}
</style>>
