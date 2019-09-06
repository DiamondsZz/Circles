<template>
  <div class="body">
    <div class="body-left">
      <a-tabs defaultActiveKey="1" :animated="false">
        <a-tab-pane tab="推荐" key="1">
          <a-list itemLayout="vertical" :dataSource="data" :locale="{emptyText: '暂无数据'}">
            <a-list-item slot="renderItem" slot-scope="item">
              <template slot="actions" v-for="{type, text} in actions">
                <span :key="type">
                  <a-icon :type="type" style="margin-right: 8px" />
                  {{text}}
                </span>
              </template>
              <img
                slot="extra"
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
              <a-list-item-meta
                description="Ant Design, a design language for background applications, 
                is refined by Ant UED TeamAnt Design, 
                a design language for background applications, 
                is refined by Ant UED TeamAnt Design,
                 a design language for background applications, 
                 is refined by Ant UED Team"
              >
                <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                ss
              </a-list-item-meta>
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
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];
export default {
  data() {
    return {
      data,
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" }
      ]
    };
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
.body-left >>> .ant-list-item {
  padding: 20px;
}
@media screen and (max-width: 480px) {
  .body-left >>> .ant-list-vertical .ant-list-item-extra {
    margin-left: 10px;
  }
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
.body-left >>> .ant-list-item-action {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
