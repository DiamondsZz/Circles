<!--评论列表-->
<template>
  <div class="comment">
    <div class="comment-head">
      <span class="comment-head-l">166条评论</span>
      <span class="comment-head-r">
        <span class="comment-head-r-icon">
          <a-icon type="swap" />
        </span>
        <span class="comment-head-r-text">切换为时间排序</span>
      </span>
    </div>
    <div class="comment-body">
      <div class="comment-body-item" v-for="(root,i) in comment" :key="i">
        <div
          class="comment-body-item-root"
          @mouseover="hover(root.rootComment)"
          @mouseout="out(root.rootComment)"
        >
          <div class="comment-body-item-head">
            <span class="comment-body-item-head-l">
              <img :src="root.rootComment.img" alt />
              {{root.rootComment.name}}
            </span>
            <span class="comment-body-item-head-r">{{root.rootComment.time}}</span>
          </div>
          <div class="comment-body-item-body">
            <div class="comment-body-item-content">{{root.rootComment.text}}</div>
            <div class="comment-body-item-actions">
              <div class="comment-body-item-action">
                <span class="comment-body-item-action-like comment-body-item-icon">
                  <a-icon type="like" />
                  {{root.rootComment.like}}
                </span>
                <span class="comment-body-item-action-other" v-show="root.rootComment.isHover">
                  <span class="comment-body-item-icon" @click="apply(root.rootComment)">
                    <a-icon type="swap-left" />
                    {{root.rootComment.isApply?'取消回复':'回复'}}
                  </span>
                  <span class="comment-body-item-icon">
                    <a-icon type="dislike" />
                    {{root.rootComment.disLike?'取消踩':'踩'}}
                  </span>
                </span>
              </div>

              <div
                class="comment-body-item-inp"
                :class="{'comment-body-item-inp-active':root.rootComment.isApply} "
              >
                <a-input class="comment-body-item-inp-l" v-if="root.rootComment.isApply">
                  <a-icon slot="suffix" type="smile" />
                </a-input>

                <transition name="comment-body-item-inp-btn">
                  <a-button
                    v-if="root.rootComment.isApply"
                    class="comment-body-item-inp-r"
                    type="primary"
                  >发布</a-button>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div
          class="comment-body-item-child"
          v-for="(child,j) in root.childComment"
          :key="j"
          @mouseover="hover(child)"
          @mouseout="out(child)"
        >
          <div class="comment-body-item-head">
            <span class="comment-body-item-head-l">
              <img :src="child.img" alt />
              {{child.name}}
              <span class="comment-body-item-head-apply">
                <span class="comment-body-item-head-apply-text">回复</span>
                {{child.applyTo}}
              </span>
            </span>
            <span class="comment-body-item-head-r">{{child.time}}</span>
          </div>
          <div class="comment-body-item-body">
            <div class="comment-body-item-content">{{child.text}}</div>
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
                <a-input class="comment-body-item-inp-l" v-if="child.isApply">
                  <a-icon slot="suffix" type="smile" />
                </a-input>
                <transition name="comment-body-item-inp-btn">
                  <a-button class="comment-body-item-inp-r" type="primary" v-if="child.isApply">发布</a-button>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-foot">
      <div class="comment-foot-page"></div>
      <div class="comment-foot-input"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //评论列表内容
      comment: [
        {
          rootComment: {
            img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
            name: "啧啧啧",
            time: "一年前",
            text: "哈哈哈",
            like: 228,
            isApply: false,
            isDislike: false,
            isHover: false
          },
          childComment: [
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧啧",
              time: "十年前",
              text: "哈哈哈哈哈哈哈",
              like: 22,
              isApply: false,
              applyTo: "啧啧啧",
              isDislike: false,
              isHover: false
            },
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧",
              time: "一万年前",
              text: "哈哈哈哈哈哈哈哈哈哈哈哈",
              like: 32,
              isApply: false,
              applyTo: "啧啧",
              isDislike: false,
              isHover: false
            },
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧",
              time: "一万年前",
              text: "哈哈哈哈哈哈哈哈哈哈哈哈",
              like: 32,
              isApply: false,
              applyTo: "啧啧",
              isDislike: false,
              isHover: false
            },
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧",
              time: "一万年前",
              text: "哈哈哈哈哈哈哈哈哈哈哈哈",
              like: 32,
              isApply: false,
              applyTo: "啧啧",
              isDislike: false,
              isHover: false
            },
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧",
              time: "一万年前",
              text: "哈哈哈哈哈哈哈哈哈哈哈哈",
              like: 32,
              isApply: false,
              applyTo: "啧啧",
              isDislike: false,
              isHover: false
            },
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧",
              time: "一万年前",
              text: "哈哈哈哈哈哈哈哈哈哈哈哈",
              like: 32,
              isApply: false,
              applyTo: "啧啧",
              isDislike: false,
              isHover: false
            }
          ]
        },
        {
          rootComment: {
            img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
            name: "啧啧啧",
            time: "一年前",
            text: "哈哈哈",
            like: 228,
            isApply: false,
            isDislike: false,
            isHover: false
          },
          childComment: [
            {
              img: "https://pic2.zhimg.com/ebba3f748_xs.jpg",
              name: "啧啧",
              time: "十年前",
              text: "哈哈哈哈哈哈哈",
              like: 22,
              isApply: false,
              applyTo: "啧啧啧",
              isDislike: false,
              isHover: false
            }
          ]
        }
      ]
    };
  },
  methods: {
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
    }
  },
  created() {},
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
</style>