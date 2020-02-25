<!-- 发现-->
<template>
  <div class="index">
    <line-chart  :chartData="userData" til="来往榜（最近与你互动频繁的用户）"></line-chart>
    <line-chart-answer  :chartData="answerData" til="热门问题榜"></line-chart-answer>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import LineChartAnswer from "@/components/LineChartAnswer";
export default {
  data() {
    return {
      userData: {},
      answerData: {}
    };
  },
  methods: {
    getUsersData() {
      this.$axios
        .get("/message/all/user/get", {
          params: { id: this.$store.state.user._id }
        })
        .then(res => {
          if (res.status === 200) {
            this.userData = {
              x: res.data.user,
              y: res.data.count
            };
          }
        });
    },
    getAnswersData() {
      this.$axios
        .get("/answer/hot/get", {
          params: {}
        })
        .then(res => {
          if (res.status === 200) {
            this.answerData = {
              x: res.data.question,
              y: res.data.answer
            };
          }
        });
    }
  },
  created() {
    this.getUsersData();
    this.getAnswersData();
  },

  components: { LineChart, LineChartAnswer }
};
</script>
<style scoped>
.index {
  width: 990px;
  margin: 10px auto;
  background-color: #fff;
  padding: 20px 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>