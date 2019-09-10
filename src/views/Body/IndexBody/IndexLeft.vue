<!--首页内容左边 -->
<template>
  <div class="body-left">
    <a-tabs defaultActiveKey="1" :animated="false">
      <a-tab-pane tab="推荐" key="1">
        <a-list itemLayout="vertical" :dataSource="recomData" :locale="{emptyText: '暂无数据'}">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.description">
              <a slot="title" @click="showDetails(item)">{{item.title}}</a>
            </a-list-item-meta>
            <template slot="actions">
              <span>
                <a-icon
                  type="like"
                  class="body-left-actions-icon"
                  theme="filled"
                  @click="likeClick(item)"
                />
                {{item.like}}
              </span>
              <span>
                <a-icon type="dislike" class="body-left-actions-icon" theme="filled" />
                {{item.dislike}}
              </span>
              <span>
                <a-icon type="message" class="body-left-actions-icon" theme="filled" />
                {{item.message}}条评论
              </span>
              <span>
                <a-icon type="rocket" class="body-left-actions-icon" theme="filled" />分享
              </span>
              <span>
                <a-icon type="star" class="body-left-actions-icon" theme="filled" />收藏
              </span>
            </template>
            <img v-if="item.media" slot="extra" width="272" alt="logo" :src="item.media" />
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
      recomData: [
        {
          title: "《王者荣耀》有什么鲜为人知的操作技巧？",
          description:
            "赫连谁谁： 好久不玩这个游戏了，今天看了个视频突然有点想玩一把，哈哈哈",
          media:
            "https://pic1.zhimg.com/50/v2-680c3cb36c5cdd557537336cd0b01e48_400x224.jpg",
          like: 23,
          user: { likeStatus: true, disLikeStatus: false },
          dislike: 4,
          message: 28
        },
        {
          title: "跳绳才是减脂大杀器！你得这么跳",
          description:
            "左菲约瘦： 跳绳，是大家再熟悉不过的运动，然而，跳了那么久，你跳绳的动作真的正确吗？想要减脂，跳绳好还是跑步好？跳绳会不会让小腿变粗呢？今天，小乐就来给大家一一解答。 图片版权归乐动力所有 跳绳 vs 跑步",
          media:
            "https://pic1.zhimg.com/50/v2-ff5f65186e5b6f6b013f44ac892b0a38_400x224.jpg",
          like: 3,
          user: { likeStatus: false, disLikeStatus: false },
          dislike: 24,
          message: 2
        },
        {
          title: "为什么说不抽烟不喝酒的男人才最可怕？",
          description:
            "关心心： 我老公，不抽烟不喝酒不打游戏自从我怀孕之后也“戒色”了 医院工作，上班时间固定，下了班就回家，没在外面多逗留过一分钟… 对我照顾的比我妈都周到，永远给我带着水杯铃着包，可能有人觉得他娘了，可是他是",
          media:
            "https://pic1.zhimg.com/50/v2-680c3cb36c5cdd557537336cd0b01e48_400x224.jpg",
          like: 123,
          user: { likeStatus: false, disLikeStatus: false },
          dislike: 48,
          message: 2899
        }
      ]
    };
  },
  methods: {
    //路由调用
    router(path) {
      this.$router.push(path);
    },
    //查看文章详情
    showDetails(item) {
      this.router("/details");
    },
    //赞
    likeClick(item) {}
  },
  created() {},
  components: {}
};
</script>
<style scoped>
/*内容左边部分*/
.body .body-left {
  width: 694px;
  background-color: #fff;
  margin-right: 10px;
}
.body-left >>> .ant-tabs-tab {
  margin: 0 22px;
  padding: 18px 0;
  font-size: 16px;
}
.body-left >>> .ant-tabs-ink-bar {
  display: none !important;
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
  border-radius: 4px;
}
.body-left >>> .ant-list-item-meta-title a {
  font-size: 18px;
  font-weight: 800;
  color: #000;
}

.body-left >>> .ant-list-item-meta-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #1a1a1a;
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