<!--文章详情内容头部-->
<template>
  <div class="details-head">
    <div class="details-body-head">
      <div class="details-body-head-content">
        <div class="details-body-head-content-left">
          <div class="details-body-head-content-left-tags">
            <a-tag color="blue" v-for="(item,i) in details.tags" :key="i">{{item}}</a-tag>
          </div>
          <div class="details-body-head-content-left-til">{{details.til}}</div>
          <div
            class="details-body-head-content-left-short"
            :class="{'details-body-head-content-left-short-expand':details.isShowTotal,'details-body-head-content-left-short-close':!details.isShowTotal}"
          >
            <span
              class="details-body-head-content-left-short-text"
            >{{details.isShowTotal?details.text:details.text.substring(0,80)}}</span>
            <span
              type="link"
              class="details-body-head-content-left-short-btn"
              v-if="!details.isShowTotal"
              @click="showTotal"
            >
              显示全部
              <a-icon class="details-body-head-content-left-short-btn-icon" type="down" />
            </span>
          </div>
        </div>
        <div class="details-body-head-content-right">
          <div class="details-body-head-content-right-item">
            <span class="details-body-head-content-right-item-til">关注者</span>
            <span class="details-body-head-content-right-item-text">{{details.follow}}</span>
          </div>
          <div class="details-body-head-content-right-item">
            <span class="details-body-head-content-right-item-til">被浏览</span>
            <span class="details-body-head-content-right-item-text">{{details.look}}</span>
          </div>
        </div>
      </div>
      <div class="details-body-head-actions">
        <a-button
          type="primary"
          class="details-body-head-actions-item details-body-head-actions-btn"
        >关注问题</a-button>
        <a-button
          type="primary"
          ghost
          class="details-body-head-actions-item details-body-head-actions-btn"
        >
          <a-icon type="edit" />写回答
        </a-button>
        <a-button class="details-body-head-actions-item details-body-head-actions-btn">
          <a-icon type="team" />邀请回答
        </a-button>
        <span class="details-body-head-actions-item details-body-head-actions-comment">
          <a-icon class="details-body-head-actions-icon" type="message" theme="filled" />
          {{details.commentCount}}条评论
        </span>
        <span class="details-body-head-actions-item details-body-head-actions-share">
          <a-icon class="details-body-head-actions-icon" type="rocket" theme="filled" />分享
        </span>
        <span
          class="details-body-head-actions-item details-body-head-actions-up"
          v-if="details.isShowTotal"
          @click="closeTotal"
        >
          <a-icon class="details-body-head-actions-icon" type="up" />收起
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {
        isShowTotal: false,
        tags: ["马云", "互联网", "BAT"],
        til:
          "2019 年 9 月 10 日马云正式宣布不再担任阿里巴巴董事局主席，阿里未来会如何发展？",
        text:
          "9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的9月10日教师节，阿里巴巴创办人、「乡村教师」马云将正式卸任董事局主席一职，而今日也正是阿里巴巴集团创办20周年整，马云昨日亲身到访阿里巴巴位于杭州的",
        commentCount: 34,
        follow: 22456,
        look: 23
      }
    };
  },
  methods: {
    //显示全部
    showTotal() {
      this.$set(this.details, "isShowTotal", true);
    },
    closeTotal() {
      this.$set(this.details, "isShowTotal", false);
    }
  },
  created() {},
  components: {}
};
</script>
<style scoped>
.details-head {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
/*文章详情头部*/
.details-body-head {
  width: 1000px;
  margin: 0 auto;
  padding: 16px;
}

.details-body-head-content {
  display: flex;
  justify-content: space-between;
}

/*文章详情头部左边*/
.details-body-head-content .details-body-head-content-left {
  width: 694px;
  flex-shrink: 0; /*伸缩量*/
}
.details-body-head-content .details-body-head-content-left-tags >>> .ant-tag {
  padding: 0 12px;
  height: 30px;
  line-height: 26px;
  border-radius: 100px;
}
.details-body-head-content-left .details-body-head-content-left-til {
  margin-top: 12px;
  margin-bottom: 4px;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
}
.details-body-head-content-left-short-close {
  overflow: hidden;
  max-height: 50px;
}
.details-body-head-content-left-short-expand {
  height: auto;
}
.details-body-head-content-left-short
  .details-body-head-content-left-short-text {
  font-size: 15px;
  line-height: 25px;
}
.details-body-head-content-left-short
  .details-body-head-content-left-short-btn {
  color: #8590a6;
  margin-left: 10px;
  cursor: pointer;
}
.details-body-head-content-left-short-btn >>> .ant-btn {
  padding: 0;
}
.details-body-head-content-left-short-btn >>> .ant-btn > .anticon + span {
  margin-left: 4px;
}
.details-body-head-content-left-short-btn-icon {
  font-size: 10px;
}
/*文章详情头部右边*/
.details-body-head-content .details-body-head-content-right {
  width: 296px;
  display: flex;
  justify-content: flex-end;
}
.details-body-head-content-right .details-body-head-content-right-item {
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.details-body-head-content-right
  .details-body-head-content-right-item:nth-child(1) {
  border-right: 1px solid #ebebeb;
}
.details-body-head-content-right-item
  .details-body-head-content-right-item-til {
  color: #8590a6;
}
.details-body-head-content-right-item
  .details-body-head-content-right-item-text {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 800;
}
/*文章详情头部按钮*/
.details-body-head-actions {
  margin-top: 4px;
}
.details-body-head-actions .details-body-head-actions-item {
  margin-right: 16px;
}
.details-body-head-actions .details-body-head-actions-icon {
  margin-right: 4px;
}
.details-body-head-actions .details-body-head-actions-comment,
.details-body-head-actions .details-body-head-actions-share,
.details-body-head-actions .details-body-head-actions-up {
  color: #8590a6;
  cursor: pointer;
}
</style>