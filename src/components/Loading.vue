<template>
  <div id="loading" class="loading" v-if="visiblity">
    <a-icon class="icon-loading" type="loading"></a-icon>
  </div>
</template>
<script>
export default {
  props: ["visible"],
  data() {
    return {
      visiblity: false
    };
  },
  methods: {},
  watch: {
    visible(val) {
      this.visiblity = val;
    }
  },
  components: {}
};
</script>
<style scoped>
.loading {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-loading {
  font-size: 40px;
  color: #0084ff;
}
</style>