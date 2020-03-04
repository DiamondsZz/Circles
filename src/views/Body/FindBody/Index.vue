<!-- 发现-->
<template>
  <div class="index">
    <line-chart :chartData="userData" til="来往榜（最近与你互动频繁的用户）"></line-chart>
    <doughnut :chartData="typeData" til="问题分类统计"></doughnut>
    <doughnut :chartData="interestingData" til="用户兴趣分类统计"></doughnut>
    <line-chart-answer :chartData="answerData" til="热门问题榜"></line-chart-answer>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import LineChartAnswer from "@/components/LineChartAnswer";
import Doughnut from "@/components/Doughnut";
export default {
  data() {
    return {
      userData: {},
      answerData: {},
      typeData: {},
      interestingData:{}
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
    },
    //获取问题统计数据
    getQuestionCount() {
      this.$axios.get("/question/count/get", { params: {} }).then(res => {
        if (res.status === 200) {
          this.typeData = { types: res.data.type, count: res.data.count };
        }
      });
    }, //获取问题统计数据
    getInterestingData() {
      this.$axios.get("/interesting/type/get", { params: {} }).then(res => {
        if (res.status === 200) {
          this.interestingData = { types: res.data.type, count: res.data.count };
        }
      });
    }
  },
  created() {
    this.getUsersData();
    this.getAnswersData();
    this.getQuestionCount();
    this.getInterestingData();
  },

  components: { LineChart, LineChartAnswer, Doughnut }
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