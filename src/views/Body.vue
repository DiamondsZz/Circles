<template>
  <div class="body">
    <div class="body-left">
      <a-tabs defaultActiveKey="1" :animated="false">
        <a-tab-pane tab="推荐" key="1">
          <a-list itemLayout="vertical" :dataSource="recomData" :locale="{emptyText: '暂无数据'}">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.description">
                <a slot="title" href>{{item.title}}</a>
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
        <a-tab-pane tab="关注" key="2">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="热榜" key="3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
    <div class="body-right">
      <div class="body-right-write">
        <div class="body-right-write-items">
          <a class="body-right-write-item" href>
            <span class="body-right-write-item-icon">
              <a-icon type="form" />
            </span>
            <span class="body-right-write-item-text">写回答</span>
          </a>
          <a class="body-right-write-item" href>
            <span class="body-right-write-item-icon">
              <a-icon type="edit" />
            </span>
            <span class="body-right-write-item-text">写文章</span>
          </a>
          <a class="body-right-write-item" href>
            <span class="body-right-write-item-icon">
              <a-icon type="sound" />
            </span>
            <span class="body-right-write-item-text">写想法</span>
          </a>
        </div>
        <div class="body-right-write-later">
          <span class="body-right-write-later-icon">
            <a-icon type="clock-circle" />
          </span>
          <span class="body-right-write-later-text">我的稍后答</span>
        </div>
        <div class="body-right-write-draft">
          <span class="body-right-write-draft-icon">
            <a-icon type="file" />
          </span>
          <span class="body-right-write-draft-text">我的草稿</span>
        </div>
      </div>
    </div>
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
    //赞
    likeClick(item) {}
  }
};
</script>

<style scoped>
.body {
  width: 1030px;
  padding: 0 16px;
  margin: 10px auto;
  display: flex;
}
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
/*内容右边部分*/
/* flex-grow 扩展量 默认为0 ，flex-shrink 收缩量 默认为1，flex-basis 初始宽度 默认为auto*/
/*将.body-right的flex-grow设置为1，由于.body-left的flex-grow为0，.body-right的宽度将自动扩展*/
.body-right {
  flex-grow: 1;
}
.body-right-write {
  background-color: #fff;
}
.body-right-write-items {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.body-right-write-items .body-right-write-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 23px;
}
.body-right-write-items .body-right-write-item .body-right-write-item-icon {
  font-size: 18px;
  color: #8590a6;
  margin-bottom: 6px;
}
.body-right-write-items .body-right-write-item .body-right-write-item-text {
  font-size: 16px;
  color: #444;
}
.body-right-write-later {
  border-bottom: 1px solid #f0f2f7;
}
.body-right-write-later,
.body-right-write-draft {
  height: 48px;
  line-height: 48px;
  color: #8590a6;
  margin: 0 20px;
}
.body-right-write-later .body-right-write-later-icon,
.body-right-write-draft .body-right-write-draft-icon {
  font-size: 16px;
  margin-right: 10px;
}
</style>
