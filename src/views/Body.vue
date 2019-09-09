<template>
  <div class="body">
    <div class="body-left">
      <a-tabs defaultActiveKey="1" :animated="false">
        <a-tab-pane tab="推荐" key="1">
          <a-list itemLayout="vertical" :dataSource="data" :locale="{emptyText: '暂无数据'}">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.description">
                <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
              </a-list-item-meta>
              <template slot="actions">
                <span>
                  <a-icon type="like" class="body-left-actions-icon" @click="likeClick(item)" />
                  {{item.like}}
                </span>
                <span>
                  <a-icon type="dislike" class="body-left-actions-icon" />
                  {{item.dislike}}
                </span>
                <span>
                  <a-icon type="message" class="body-left-actions-icon" />
                  {{item.message}}条评论
                </span>
                <span>
                  <a-icon type="select" class="body-left-actions-icon" />分享
                </span>
                <span>
                  <a-icon type="star" class="body-left-actions-icon" />收藏
                </span>
              </template>
              <img v-if="item.media" slot="extra" width="272" alt="logo" :src="item.media" />
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane tab="关注" key="2">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="热榜" key="3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
    <div class="body-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLikeVisible: false,
      data: [
        {
          title: "Ant Design Title 1",
          description:
            "Ant Design, a design language for background applications, is refined by Ant UED TeamAnt Design",
          media:
            "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          like: 23,
          user: { likeStatus: true, disLikeStatus: false },
          dislike: 4,
          message: 28
        },
        {
          title: "Ant Design Title 2",
          user: { likeStatus: true, disLikeStatus: false },
          description:
            "Ant Design, a design language for background applications, is refined by Ant UED TeamAnt DesignAnt Design, a design language for background applications, is refined by Ant UED TeamAnt DesignAnt Design, a design language for background applications, is refined by Ant UED TeamAnt DesignAnt Design, a design language for background applications, is refined by Ant UED TeamAnt DesignAnt Design, a design language for background applications, is refined by Ant UED TeamAnt Design"
        },
        {
          title: "Ant Design Title 3",
          user: { likeStatus: true, disLikeStatus: false },
          description:
            "Ant Design, a design language for background applications, is refined by Ant UED TeamAnt Design"
        },
        {
          title: "Ant Design Title 4",
          user: { likeStatus: true, disLikeStatus: false },
          description:
            "Ant Design, a design language for background applications, is refined by Ant UED TeamAnt Design"
        }
      ]
    };
  },
  methods: {
    likeClick(item) {
      if (item.user.likeStatus) {
        this.$message.error("你已经点过赞了哦！");
      } else {
        item.like++;
      }
    }
  }
};
</script>

<style scoped>
.body {
  width: 1000px;
  padding: 0 16px;
  margin: 10px auto;
  display: flex;
}
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
  margin-left: 24px;
}
.body-left >>> .ant-list-vertical .ant-list-item-meta-title {
  font-size: 18px;
}
.body-left >>> .ant-list-item-meta-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  overflow: hidden;
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
.body .body-right {
  background-color: #fff;
}
</style>
