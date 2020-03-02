<template>
  <div>
    <a-modal
      title="选择你的兴趣偏好"
      v-model="$store.state.interestingModal"
      okText="确定"
      cancelText="取消"
      @ok="interestingCreate"
    >
      <a-checkbox-group :options="interestingOptions" @change="change" />
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interestingOptions: [], // 兴趣选项
      interestingChecked: [] //被选中的兴趣
    };
  },
  methods: {
    //问题类型查询
    quesTypeSearch(des) {
      this.$axios.get("/question/type/get", { params: { des } }).then(res => {
        if (res.status === 200) {
          this.interestingOptions = res.data;
        }
      });
    },
    //兴趣选择改变时触发
    change(val) {
      this.interestingChecked = val;
    },
    //提及用户选择的兴趣爱好
    interestingCreate() {
      if (this.interestingChecked.length === 0) {
        return this.$message.error("兴趣爱好不能为空");
      }
      this.$axios
        .post("/user/interesting", {
          user: this.$store.state.user._id,
          type: this.interestingChecked
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("interestingModal", {
              interestingModal: false
            });
          }
        });
    }
  },
  watch: {
    "$store.state.interestingModal"(val) {
      if (val) {
        this.quesTypeSearch();
      }
    }
  },
  created() {},
  components: {}
};
</script>
<style scoped>
</style>