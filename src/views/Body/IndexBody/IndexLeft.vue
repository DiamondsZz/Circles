<!--首页内容左边 -->
<template>
  <div class="body-left">
    <a-tabs :defaultActiveKey="1" :animated="false" @change="tabChange">
      <a-tab-pane tab="推荐" :key="1">
        <a-list itemLayout="vertical" :dataSource="recomData" :locale="{emptyText: '暂无推荐数据'}">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="body-left-til" @click="showDetails(item)">{{item.til}}</div>
            <div class="body-left-answer">
              {{item.answer&&item.answer[0]&&item.answer[0].user.userName}}：
              <span>{{item.answer&&item.answer[0]&&item.answer[0].content|filterAnswerContent}}</span>
            </div>
            <template slot="actions">
              <span>
                <a-icon
                  type="like"
                  class="body-left-actions-icon"
                  theme="filled"
                  @click="likeClick(item)"
                />
                {{item.answer&&item.answer[0]&&item.answer[0].like}}
              </span>
              <!-- <span>
                <a-icon type="dislike" class="body-left-actions-icon" theme="filled" />
                {{item.question_answer&&item.question_answer[0].dislike}}
              </span>-->
              <span>
                <a-icon type="message" class="body-left-actions-icon" theme="filled" />
                <span>{{item.answer&&item.answer[0]&&item.answer[0].commentCount}}条评论</span>
              </span>
              <span>
                <a-icon type="rocket" class="body-left-actions-icon" theme="filled" />分享
              </span>
              <span>
                <a-icon type="star" class="body-left-actions-icon" theme="filled" />收藏
              </span>
            </template>
            <img
              slot="extra"
              width="272"
              alt="logo"
              :src="item.cover?item.cover:'http://127.0.0.1:7001/public/ques/ae2fb8fa-83dd-48b7-a158-2013e8431b91logo.png'"
            />
          </a-list-item>
        </a-list>
        <!-- <div v-if="data.length>0" class="divider">你可能会感兴趣的问题</div> -->
        <!-- <a-list itemLayout="vertical" :dataSource="dataComputed" :locale="{emptyText: ''}">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="body-left-til" @click="showDetails(item)">{{item.til}}</div>
            <div class="body-left-answer">
              {{item.answer&&item.answer[0].user.userName}}：
              <span>{{item.answer&&item.answer[0].content|filterAnswerContent}}</span>
            </div>
            <template slot="actions">
              <span>
                <a-icon
                  type="like"
                  class="body-left-actions-icon"
                  theme="filled"
                  @click="likeClick(item)"
                />
                {{item.answer&&item.answer[0].like}}
              </span>
              <span>
                <a-icon type="dislike" class="body-left-actions-icon" theme="filled" />
                {{item.question_answer&&item.question_answer[0].dislike}}
              </span>
              <span>
                <a-icon type="message" class="body-left-actions-icon" theme="filled" />
                <span>{{item.answer&&item.answer[0].commentCount}}条评论</span>
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
        </a-list>-->
      </a-tab-pane>
      <a-tab-pane class="follow" tab="关注" :key="2">
        <div v-if="followData.length>0">
          <div class="follow-item" v-for="(item,i) in followData" :key="i">
            <div class="follow-item-img">
              <img :src="item.user.userImg" alt />
            </div>
            <div class="follow-item-text">
              <div class="follow-item-user">
                {{item.user.userName}}
                <span>{{item.type|filterMessage(item)}}</span>
                · {{moment(item.createdTime).format("YYYY-MM-DD")}}
              </div>
              <div
                v-if="item.type!==0"
                class="follow-item-til"
                @click="showDetails(item.question)"
              >{{item.question&&item.question.til}}</div>
              <div v-else class="follow-item-til" @click="showDetails(item)">{{item.til}}</div>
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <a-icon type="frown" theme="filled" class="empty-icon" />
          <p class="empty-text">空空如也</p>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="热榜" :key="3">
        <a-list itemLayout="vertical" :dataSource="hotData" :locale="{emptyText: '暂无数据'}">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="body-left-til" @click="showDetails(item)">{{item.til}}</div>
            <div class="body-left-answer">
              {{item.answer&&item.answer[0]&&item.answer[0].user.userName}}：
              <span>{{item.answer&&item.answer[0]&&item.answer[0].content|filterAnswerContent}}</span>
            </div>
            <template slot="actions">
              <span>
                <a-icon
                  type="like"
                  class="body-left-actions-icon"
                  theme="filled"
                  @click="likeClick(item)"
                />
                {{item.answer&&item.answer[0]&&item.answer[0].like}}
              </span>
              <!-- <span>
                <a-icon type="dislike" class="body-left-actions-icon" theme="filled" />
                {{item.question_answer&&item.question_answer[0].dislike}}
              </span>-->
              <span>
                <a-icon type="message" class="body-left-actions-icon" theme="filled" />
                <span>{{item.answer&&item.answer[0]&&item.answer[0].commentCount}}条评论</span>
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
    </a-tabs>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["interesting"],
  data() {
    return {
      //推荐列表数据
      recomData: [],
      data: [], //问题数据
      followData: [], //关注用户数据
      hotData: [] //热榜数据
    };
  },
  methods: {
    moment,
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
    tabChange(val) {
      switch (val) {
        case 1:
          this.isRecom();
          break;
        case 2:
          this.getData({ user: this.$store.state.user._id });
          break;
        case 3:
          this.getData({ isHot: true });
          break;
      }
    },
    isRecom() {
      if (this.interesting.length > 0) {
        this.getData({
          type: this.interesting,
          user: this.$store.state.user._id
        });
      } else {
        this.getData();
      }
    },
    //赞
    likeClick(item) {},
    //获取问题数据
    getData(params) {
      this.$store.commit("isLoad", {
        isLoad: true
      });
      this.$axios
        .post("/question/already", {
          type: params && params.type,
          user: params && params.user,
          isHot: params && params.isHot
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("isLoad", {
              isLoad: false
            });
            if (params && params.type) {
              this.recomData = res.data;
            } else if (params && params.user) {
              this.followData = res.data.map(item => {
                if (typeof item.type === "object") {
                  item.type = 0;
                }
                return item;
              });
            } else {
              this.recomData = res.data;
              this.data = res.data;
            }
          }
        });
    }
  },
  computed: {
    //过滤掉与推荐数据中重复的数据
    dataComputed() {
      let res = [];
      for (let ques of this.data) {
        let isRepeat = this.recomData.some(rec => {
          return rec._id === ques._id;
        });
        if (!isRepeat) {
          res.push(ques);
        }
      }
      return res;
    }
  },
  filters: {
    //获取问题回答富文本 的文本内容
    filterAnswerContent(val) {
      return val && val.replace(new RegExp("<.+?>", "g"), "");
    },
    filterMessage(type, item) {
      switch (type) {
        case 0:
          return `发表了问题`;
          break;
        case 1:
          return `关注了问题`;
          break;
        case 2:
          return `发表了评论`;
          break;
        case 3:
          return `回答了问题`;
          break;
      }
    }
  },
  watch: {
    interesting() {
      this.getData({
        type: this.interesting,
        user: this.$store.state.user._id
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
  height: 100%;
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
  height: 100%;
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
  color: #1a1a1a;
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

/*分割线*/
.divider {
  text-align: center;
  color: #1890ff;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

/*关注页面*/

.follow-item {
  display: flex;
  position: relative;
  padding: 20px 0px 20px 20px;
}
.follow-item:nth-child(2) {
  padding-top: 5px;
}
.follow-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  height: 1px;
  background-color: #ebeef5;
}
.follow-item-img img {
  display: flex;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-right: 12px;
  margin-top: 3px;
}
.follow-item-user {
  font-size: 13px;
  color: grey;
}
.follow-item-til {
  font-size: 14px;
  margin-top: 4px;
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
}
/*暂无数据*/
.empty {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.empty .empty-icon {
  font-size: 40px;
  color: rgba(0, 0, 0, 0.3);
}
.empty .empty-text {
  margin-top: 20px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
}
</style>