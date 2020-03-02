<!--首页内容-->
<template>
  <div class="body">
    <index-left :interesting="interesting"></index-left>
    <index-right></index-right>
    <interesting></interesting>
  </div>
</template>

<script>
import Interesting from "@/components/Interesting";
import IndexLeft from "./IndexLeft";
import IndexRight from "./IndexRight";
export default {
  data() {
    return {
      interesting: []
    };
  },
  methods: {
    //获取当前用户的兴趣爱好
    getUserInteresting() {
      this.$axios
        .get("/user/interesting/get", {
          params: { user: this.$store.state.user._id }
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.length === 0) {
              this.$store.commit("interestingModal", {
                interestingModal: true
              });
            } else {
              this.interesting = res.data[0].type;
            }
          }
        });
    },
    
  },
  created() {
    this.getUserInteresting();
  },
  components: {
    IndexLeft,
    IndexRight,
    Interesting
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
