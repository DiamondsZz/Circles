<!-- 文章详情内容身体     左-->
<template>
  <div class="left">
    <div class="left-head">
      <span class="left-head-left">{{details.total}}个回答</span>
      <div class="left-head-right">
        默认排序
        <a-icon class="left-head-right-icon" type="menu-fold" />
      </div>
    </div>
    <div class="left-body">
      <div class="left-body-item" v-for="(item,i) in details.answers" :key="i">
        <div class="left-body-user">
          <span class="left-body-user-img">
            <img src="https://pic2.zhimg.com/ebba3f748_xs.jpg" alt />
          </span>
          <div class="left-body-user-text">
            <div class="left-body-user-name">{{item.name}}</div>
            <div class="left-body-user-detail">{{item.details}}</div>
          </div>
        </div>
        <div class="left-body-person">{{item.like}}人赞同了该回答</div>
        <div class="left-body-content">{{item.text}}</div>
        <div class="left-body-expand" @click="expandText(item)" v-if="!item.isExpandText">
          展开阅读全文
          <a-icon type="down" />
        </div>
        <div class="left-body-time">发布于{{item.time}}</div>
        <div class="left-body-actions">
          <span class="left-body-actions-item">
            <a-button class="left-body-actions-up" icon="caret-up">赞同 {{item.like}}</a-button>
            <a-button class="left-body-actions-down" icon="caret-down"></a-button>
          </span>
          <span class="left-body-actions-item left-body-actions-text" @click="showComment(item)">
            <a-icon class="left-body-actions-icon" type="message" />
            <span v-if="item.isShowComment">收起评论</span>
            <span v-else>{{item.total}}条评论</span>
          </span>
          <span class="left-body-actions-item left-body-actions-text">
            <a-icon class="left-body-actions-icon" type="rocket" />分享
          </span>
          <span class="left-body-actions-item left-body-actions-text">
            <a-icon class="left-body-actions-icon" type="star" />收藏
          </span>
        </div>
        <comment :isExpand="item.isShowComment" :comment="item.comments" :commentTotal="item.total"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  data() {
    return {
      details: {
        total: 2225, //回答数
        answers: [
          {
            comments: [
              {
                id: 1,
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
                id: 2,
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
            ],
            isShowComment:true, //是否显示评论
            total: 223, //评论数
            name: "Shawn",
            details: "喜欢研究的商人（民科）",
            like: 222,
            text:
              "你举的例子，依然都还是扯谈，虽然似乎呈现在眼前了，但实际与当初吹嘘的效果差别很大。我已经得出一条屡试不爽的规律：凡是让我惊讶的新技术、新发现，都是吹牛，尤其是出现在中国的。如果文章的标题有“美国人慌了”、“全世界震惊”、“突然宣布”、“懵了”等字眼，这些文章根本不用点开。",
            time: "昨天 22:20",
            isExpandText: false
          }
        ]
      }
    };
  },
  methods: {
    //展开评论
    showComment(item) {
      this.$set(item, "isShowComment", !item.isShowComment);
    },
    expandText(item) {
      this.$set(item, "isExpandText", !item.isExpandText);
    }
  },

  created() {},
  components: { Comment }
};
</script>
<style scoped>
.left {
  width: 694px;
  margin-right: 10px;
  flex-shrink: 0;
  background-color: #fff;
}

/*头部*/
.left .left-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin: 0 20px;
  border-bottom: 1px solid #f6f6f6;
}
.left-head .left-head-left {
  font-size: 15px;
  font-weight: 600;
}
.left-head .left-head-right {
  color: #8590a6;
  margin-right: 10px;
  cursor: pointer;
}
.left-head-right-icon {
  margin-left: 10px;
}
/*身体*/
.left-body-item {
  padding: 16px 20px;
  margin-bottom: 20px;
}
.left-body-item::after {
  display: inline-block;
  content: "";
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
}
.left-body .left-body-user {
  display: flex;
  align-items: center;
}
.left-body-user .left-body-user-img img {
  width: 38px;
  height: 38px;
}
.left-body-user .left-body-user-text {
  margin-left: 14px;
}
.left-body-user-text .left-body-user-name {
  font-size: 15px;
  font-weight: 600;
}
.left-body-user-text .left-body-user-detail {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #646464;
}
.left-body .left-body-person {
  color: #8590a6;
  margin: 10px 0;
}
.left-body .left-body-content {
  line-height: 24px;
  /* 遮罩层 */
  mask-image: linear-gradient(#000, transparent);
}
.left-body .left-body-expand {
  color: #175199;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
}
.left-body .left-body-time {
  color: #8590a6;
  margin: 10px 0;
}

.left-body-actions .left-body-actions-up {
  margin-right: 5px;
}
.left-body-actions .left-body-actions-up {
  color: #0084ff;
  background-color: rgba(0, 132, 255, 0.1) !important;
  border: none;
}
.left-body-actions .left-body-actions-down {
  color: #0084ff;
  background-color: rgba(0, 132, 255, 0.1) !important;
  border: none;
}
.left-body .left-body-actions .left-body-actions-item {
  margin-right: 20px;
}
.left-body .left-body-actions .left-body-actions-icon {
  margin-right: 6px;
}
.left-body .left-body-actions .left-body-actions-text {
  color: #8590a6;
  cursor: pointer;
}
</style>