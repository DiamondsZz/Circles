<!-- 发现-->
<template>
  <div>
    <div class="index">
      <line-chart :chartData="userData" til="来往榜（最近与你互动频繁的用户）"></line-chart>
      <doughnut :chartData="typeData" til="问题分类统计"></doughnut>
      <doughnut :chartData="interestingData" til="用户兴趣分类统计" @showUser="showUsers"></doughnut>
      <line-chart-answer :chartData="answerData" til="热门问题榜"></line-chart-answer>
      <Dataset :chartData="userDataset" til="关于你的"></Dataset>
      <!-- <Dataset chartData="[" til="话题榜"></Dataset> -->
    </div>
    <a-modal
      :width="700"
      :visible="userVisible"
      :title="'你们都喜欢与'+typeName+'有关的问题'"
      :footer="null"
      @cancel="userVisible=false"
    >
      <div class="user" v-for="(item,i) in users" :key="i">
        <div class="user-left">
          <span class="user-img">
            <img :src="item.user.userImg" alt />
          </span>
          <span class="user-name">{{item.user.userName}}</span>
        </div>
        <div class="user-right">
          <a-button :type="item.isFollow?'default':'primary'" @click="followUser(item.user._id)">
            <span v-if="item.isFollow">已关注</span>
            <span v-else>关注他</span>
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import LineChartAnswer from "@/components/LineChartAnswer";
import Doughnut from "@/components/Doughnut";
import Dataset from "@/components/Dataset";
export default {
  data() {
    return {
      userData: {}, //互动用户
      answerData: {}, //热门问题
      typeData: {}, //问题分类
      interestingData: {}, //用户兴趣爱好分类
      userVisible: false, //用户面板
      users: [], //用户
      typeName: "", //兴趣爱好名字
      userDataset: {} //大v榜
    };
  },
  methods: {
    //查看用户
    showUsers(name) {
      this.userVisible = true;
      this.typeName = name;
      this.$axios
        .get("/interesting/user/get", {
          params: { name, fromUser: this.$store.state.user._id }
        })
        .then(res => {
          if (res.status === 200) {
            this.users = res.data;
          }
        });
    },
    //关注用户
    followUser(user) {
      this.$axios
        .post("/follow/user", {
          user,
          fromUser: this.$store.state.user._id
        })
        .then(res => {
          if (res.status === 200) {
            this.showUsers(this.typeName);
            if (res.data.isFollow) {
              this.$message.success("关注成功");
            } else {
              this.$message.success("取消成功");
            }
          }
        });
    },
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
          this.interestingData = {
            types: res.data.type,
            count: res.data.count
          };
        }
      });
    },
    getUserDataset() {
      this.$axios
        .get("/question/user/get", {
          params: { user: this.$store.state.user._id }
        })
        .then(res => {
          if (res.status === 200) {
            this.userDataset = {
              x: ["爱好", ...res.data.interesting],
              y: ["最近一周", ...res.data.count]
            };
          }
        });
    }
  },
  created() {
    this.getUsersData();
    this.getAnswersData();
    this.getQuestionCount();
    this.getInterestingData();
    this.getUserDataset();
  },

  components: { LineChart, LineChartAnswer, Doughnut, Dataset }
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

/*用户面板*/
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  padding: 14px 0;
}
.user-img img {
  width: 30px;
  border-radius: 30px;
}
.user-name {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
</style>