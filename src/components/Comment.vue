<!--评论列表-->
<template>
  <div class="comment" v-if="isCommentExpand">
    <div class="comment-head">
      <span class="comment-head-l">{{commentTotal}}条评论</span>
      <span class="comment-head-r">
        <span class="comment-head-r-icon">
          <a-icon type="swap" />
        </span>
        <span class="comment-head-r-text">切换为时间排序</span>
      </span>
    </div>
    <div class="comment-body">
      <div class="comment-body-item" v-for="(root,i) in comment" :key="i">
        <div class="comment-body-item-root" @mouseover="hover(root)" @mouseout="out(root)">
          <div class="comment-body-item-head">
            <span class="comment-body-item-head-l">
              <img :src="root.user&&root.user.userImg" alt />
              {{root.user&&root.user.userName}}
            </span>
            <span class="comment-body-item-head-r">{{moment(root.createdTime).format("YYYY-MM-DD HH:mm")}}</span>
          </div>
          <div class="comment-body-item-body">
            <div class="comment-body-item-content">{{root.content}}</div>
            <div class="comment-body-item-actions">
              <div class="comment-body-item-action">
                <span class="comment-body-item-action-like comment-body-item-icon">
                  <a-icon type="like" />
                  {{root.like}}
                </span>
                <span class="comment-body-item-action-other" v-show="root.isHover">
                  <span class="comment-body-item-icon" @click="apply(root)">
                    <a-icon type="swap-left" />
                    {{root.isApply?'取消回复':'回复'}}
                  </span>
                  <span class="comment-body-item-icon">
                    <a-icon type="dislike" />
                    {{root.disLike?'取消踩':'踩'}}
                  </span>
                </span>
              </div>

              <div
                class="comment-body-item-inp"
                :class="{'comment-body-item-inp-active':root.isApply} "
              >
                <a-input
                  class="comment-body-item-inp-l"
                  v-if="root.isApply"
                  v-model="childCommentContent"
                >
                  <a-icon slot="suffix" type="smile" />
                </a-input>

                <transition name="comment-body-item-inp-btn">
                  <a-button
                    v-if="root.isApply"
                    class="comment-body-item-inp-r"
                    type="primary"
                    @click="publishChildComment(root._id,root.user._id)"
                  >发布</a-button>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div
          class="comment-body-item-child"
          v-for="(child,j) in root.child"
          :key="j"
          @mouseover="hover(child)"
          @mouseout="out(child)"
        >
          <div class="comment-body-item-head">
            <span class="comment-body-item-head-l">
              <img :src="child.user&&child.user.userImg" alt />
              {{child.user&&child.user.userName}}
              <span
                class="comment-body-item-head-apply"
              >
                <span class="comment-body-item-head-apply-text">回复</span>
                {{child.userCommented&&child.userCommented.userName}}
              </span>
            </span>
            <span class="comment-body-item-head-r">{{moment(child.createdTime).format("YYYY-MM-DD HH:mm")}}</span>
          </div>
          <div class="comment-body-item-body">
            <div class="comment-body-item-content">{{child.content}}</div>
            <div class="comment-body-item-actions">
              <div class="comment-body-item-action">
                <span class="comment-body-item-action-like comment-body-item-icon">
                  <a-icon type="like" />
                  {{child.like}}
                </span>
                <span class="comment-body-item-action-other" v-show="child.isHover">
                  <span class="comment-body-item-icon" @click="apply(child)">
                    <a-icon type="swap-left" />
                    {{child.isApply?"取消回复":"回复"}}
                  </span>
                  <span class="comment-body-item-icon">
                    <a-icon type="dislike" />
                    {{child.isDislike?"取消踩":"踩"}}
                  </span>
                </span>
              </div>
              <div
                class="comment-body-item-inp"
                :class="{'comment-body-item-inp-active':child.isApply}"
              >
                <a-input
                  class="comment-body-item-inp-l"
                  v-if="child.isApply"
                  v-model="childCommentContent"
                >
                  <a-icon slot="suffix" type="smile" />
                </a-input>
                <transition name="comment-body-item-inp-btn">
                  <a-button
                    class="comment-body-item-inp-r"
                    type="primary"
                    v-if="child.isApply"
                    @click="publishChildComment(root._id,child.user._id)"
                  >发布</a-button>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-foot">
      <div class="comment-foot-page" v-if="total>0">
        <a-pagination
          :current="currentPage"
          :total="total"
          :pageSize="pageSize"
          @change="pageChange"
        />
      </div>
      <div class="comment-foot-input">
        <a-input class="comment-foot-input-l" placeholder="写下你的评论..." v-model="rootCommentContent"></a-input>
        <a-button class="comment-foot-input-r" type="primary" @click="publishRootComment">发布</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["comment", "isExpand", "commentTotal"],
  data() {
    return {
      currentPage: 1,
      total: this.commentTotal,
      pageSize: 4,
      isCommentExpand: false,
      childCommentContent: "", //评论的评论内容
      rootCommentContent: "" //回答的评论内容
    };
  },
  methods: {
    moment,
    //点击回复按钮
    apply(item) {
      this.$set(item, "isApply", !item.isApply);
    },
    //鼠标进入评论区域
    hover(item) {
      this.$set(item, "isHover", true);
    },
    //鼠标离开评论区域
    out(item) {
      this.$set(item, "isHover", false);
    },
    //发布回答的评论内容
    publishRootComment() {
      if (!this.rootCommentContent.trim()) {
        this.$message.error("评论内容不能为空");
      } else {
        this.$emit("publishRootComment", { text: this.rootCommentContent });
      }
    },
    //发布评论的评论内容
    publishChildComment(commentId, userId) {
      if (!this.childCommentContent.trim()) {
        this.$message.error("评论内容不能为空");
      } else {
        this.$emit("publishChildComment", {
          text: this.childCommentContent,
          commentId,
          userId
        });
      }
    },
    //页面切换
    pageChange(currentPage) {
      this.currentPage = currentPage;
      this.$emit("pageChange", currentPage);
    }
  },
  watch: {
    isExpand(item) {
      this.isCommentExpand = item;
    },
    commentTotal(total) {
      this.total = total;
    }
  },
  created() {
    this.isCommentExpand = this.isExpand;
  },
  components: {}
};
</script>
<style scoped>
.comment {
  border: 1px solid #ebebeb;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  margin-top: 12px;
  border-radius: 4px;
}
/*评论头部*/
.comment .comment-head {
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.comment-head .comment-head-l {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}
.comment-head .comment-head-r {
  color: #76839b;
  cursor: pointer;
}
.comment-head-r .comment-head-r-icon {
  margin-right: 6px;
}
/*评论根、子节点*/
.comment-body-item {
  margin: 0 20px;
  border-bottom: 1px solid #f6f6f6;
}

.comment-body-item-root,
.comment-body-item-child {
  position: relative;
  font-size: 15px;
}
.comment-body-item-root {
  padding: 12px 20px 10px;
}
.comment-body-item-child {
  padding: 12px 20px 10px 54px;
}
.comment-body-item-root::after,
.comment-body-item-child::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: inline-block;
  content: "";
  border-bottom: 1px solid #f6f6f6;
}
.comment-body-item-root::after {
  margin-left: 54px;
}
.comment-body-item-child::after {
  margin-left: 88px;
}
.comment-body-item .comment-body-item-root:nth-last-child(1)::after {
  border: none;
}
.comment-body-item .comment-body-item-child:nth-last-child(1)::after {
  border: none;
}

/*评论节点*/
.comment-body-item-root .comment-body-item-head,
.comment-body-item-child .comment-body-item-head {
  display: flex;
  justify-content: space-between;
  height: 24px;
  line-height: 24px;
  padding-right: 4px;
  margin-bottom: 4px;
}
.comment-body-item-head .comment-body-item-head-l img {
  width: 24px;
  height: 24px;
  margin-right: 4px;
}
.comment-body-item-head-l .comment-body-item-head-apply-text {
  color: #8590a6;
  margin: 0 8px;
}
.comment-body-item-head .comment-body-item-head-r {
  color: #8590a6;
}
.comment-body-item-body {
  padding-left: 34px;
}
.comment-body-item-body .comment-body-item-content {
  line-height: 25px;
}
.comment-body-item-content .comment-body-item-actions {
  line-height: 24px;
  margin-top: 4px;
}
.comment-body-item-action .comment-body-item-icon {
  color: #8590a6;
  font-size: 14px;
  margin-right: 16px;
  cursor: pointer;
}
.comment-body-item-action .comment-body-item-icon >>> .anticon {
  margin-right: 4px;
}
.comment-body-item-inp {
  display: flex;
  justify-content: flex-end;
  transition: padding 0.5s;
}
.comment-body-item-inp-active {
  justify-content: space-between;
  padding: 14px 0;
}
.comment-body-item-inp .comment-body-item-inp-l {
  margin-right: 20px;
}

/*评论发布按钮显示与隐藏*/
.comment-body-item-inp-btn-enter,
.comment-body-item-inp-btn-leave-to {
  transform: scale(0);
}
.comment-body-item-inp-btn-enter-active,
.comment-body-item-inp-btn-leave-active {
  transition: all 0.2s;
}

/*评论底部*/
.comment-foot-page {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding: 12px 0;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}
.comment-foot-input {
  display: flex;
  padding: 12px 20px;
}
.comment-foot-input-l {
  height: 40px;
  margin-right: 20px;
}
.comment-foot-input-r {
  height: 40px;
}
</style>