<!--首页内容左边 -->
<template>
  <div class="body-left">
    <div class="question-list">
      <div class="question-list-item" v-for="(item,i) in data" :key="i">
        <div class="question-list-item-top" @click="writeAnswer(item._id)">{{item.til}}</div>
        <div class="question-list-item-bottom">
          <div class="question-list-item-action">
            <span class="question-list-item-text" @click="writeAnswer(item._id)">
              <a-button type="primary" ghost>
                <a-icon type="edit" />写回答
              </a-button>
            </span>
            <span class="question-list-item-text">
              <a-icon type="plus" class="question-list-item-icon" />关注问题
            </span>
          </div>
          <div class="question-list-item-info">
            <span
              class="question-list-item-text"
            >{{item.question_answer&&item.question_answer.length}}个回答</span>
            <span class="question-list-item-text">{{item.looked}}次浏览</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //回答数据
      data: []
    };
  },
  methods: {
    //获取回答数据
    getData() {
      this.$axios.get("/question/get").then(res => {
        if (res.status === 200) {
          this.data = res.data;
        }
      });
    },
    //回答问题
    writeAnswer(id) {
      this.$router.push({
        path: "details",
        query: {
          id
        }
      });
    }
  },

  created() {
    this.getData();
  },
  components: {}
};
</script>
<style scoped>
/*内容左边部分*/
.body .body-left {
  width: 694px;
  height:100%;
  background-color: #fff;
  margin-right: 10px;
}
.question-list {
  padding: 0 20px;
}
.question-list .question-list-item {
  padding: 20px 0;
  border-bottom: 1px solid #f6f6f6;
}
.question-list-item-top {
  padding-right: 20px;
  color: #1a1a1a;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 8px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.question-list-item-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.question-list-item-icon {
  margin-right: 4px;
}
.question-list-item-text {
  color: #76839b;
  cursor: pointer;
}
.question-list-item-action .question-list-item-text {
  margin-right: 20px;
}
.question-list-item-info .question-list-item-text {
  margin-right: 10px;
}
</style>