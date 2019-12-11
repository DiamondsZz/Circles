<!--首页内容左边 -->
<template>
  <div class="body-left">
    <a-tabs defaultActiveKey="1" :animated="false">
      <a-tab-pane tab="推荐" key="1">
        <a-list itemLayout="vertical" :dataSource="recomData" :locale="{emptyText: '暂无数据'}">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="body-left-til" @click="showDetails(item)">{{item.til}}</div>
            <div class="body-left-answer">
              {{item.question_answer&&item.question_answer[0].userName}}：
              <span>{{item.question_answer&&item.question_answer[0].content|filterAnswerContent}}</span>
            </div>
            <template slot="actions">
              <span>
                <a-icon
                  type="like"
                  class="body-left-actions-icon"
                  theme="filled"
                  @click="likeClick(item)"
                />
                {{item.question_answer&&item.question_answer[0].like}}
              </span>
              <!-- <span>
                <a-icon type="dislike" class="body-left-actions-icon" theme="filled" />
                {{item.question_answer&&item.question_answer[0].dislike}}
              </span>-->
              <span>
                <a-icon type="message" class="body-left-actions-icon" theme="filled" />
                <span>{{item.question_answer&&item.question_answer[0].commentCount}}条评论</span>
              </span>
              <span>
                <a-icon type="rocket" class="body-left-actions-icon" theme="filled" />分享
              </span>
              <span>
                <a-icon type="star" class="body-left-actions-icon" theme="filled" />收藏
              </span>
            </template>
            <img v-if="item.cover" slot="extra" width="272" alt="logo" :src="item.cover" />
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane tab="关注" key="2">关注</a-tab-pane>
      <a-tab-pane tab="热榜" key="3">热榜</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //推荐列表数据
      recomData: []
    };
  },
  methods: {
    //路由调用
    router(path) {
      this.$router.push(path);
    },
    //查看文章详情
    showDetails(item) {
      this.router({
        path: "/details",
        query: {
          id: item._id
        }
      });
    },
    //赞
    likeClick(item) {},
    //获取问题数据
    getData() {
      this.$axios.get("/question/already").then(res => {
        if (res.status === 200) {
          this.recomData = res.data;
        }
      });
    }
  },
  filters: {
    //获取问题回答富文本 的文本内容
    filterAnswerContent(val) {
      return val && val.replace(new RegExp("<.+?>", "g"), "");
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
  background-color: #fff;
  margin-right: 10px;
  box-shadow: 0px 1px 3px rgba(26, 26, 26, 0.1);
}
.body-left >>> .ant-tabs-tab {
  margin: 0 22px;
  padding: 18px 0;
  font-size: 16px;
}
.body-left >>> .ant-tabs-ink-bar {
  display: none !important;
  margin: 0;
}
.body-left >>> .ant-list-item-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.body-left >>> .ant-list-item {
  padding: 20px;
}
.body-left >>> .ant-list-vertical .ant-list-item-extra {
  width: 190px;
  height: 105px;
  margin-left: 24px;
}
.body-left >>> .ant-list-vertical .ant-list-item-extra img {
  width: 100%;
  height:100%;
  border-radius: 4px;
}
.body-left .body-left-til {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  margin-bottom: 4px;
}
.body-left .body-left-answer {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color:#1a1a1a;
  font-size: 15px;
}
.body-left .body-left-actions-icon {
  margin-right: 4px;
}
.body-left >>> .ant-list-item-action {
  margin-left: 0;
}
.body-left >>> .ant-list-item-action li {
  padding-left: 0;
  padding-right: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.body-left >>> .ant-list-item-action .ant-list-item-action-split {
  display: none;
}
</style>