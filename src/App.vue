<template>
  <div id="app">
    <router-view></router-view>
    <empty :visible="$store.state.isLoad"></empty>
  </div>
</template>
<script>
import Empty from "@/components/Empty";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Empty
  }
};
</script>

<style scoped>
#app {
  height:100%;
}
</style>>
