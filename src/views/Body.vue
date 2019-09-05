<template>
  <div class="body">
    <div class="body-left">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="推荐" key="1">
          <a-list itemLayout="horizontal" :dataSource="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
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
      data
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
.body .body-left >>> .ant-tabs-tab {
  margin: 0 22px;
  padding: 20px 0;
  font-size: 16px;
}
.body .body-right {
  background-color: #fff;
}
</style>
