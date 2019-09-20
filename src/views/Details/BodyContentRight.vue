<!-- 文章详情内容身体   右-->
<template>
  <div class="right">
    <div class="right-question">
      <div class="right-question-head">相关问题</div>
      <div class="right-question-body">
        <div class="right-question-body-item">
          5G的普及会对无人驾驶带来改变么？
          <span class="right-question-body-answer">3个回答</span>
        </div>
      </div>
    </div>
    <div class="right-recommend">
      <div class="right-recommend-head">相关推荐</div>
      <div class="right-recommend-body">
        <div class="right-recommend-body-item">
          <div class="right-recommend-body-img">
            <img src="https://pic4.zhimg.com/90/v2-6956ae2f9652788ac6a67529b8d515b5_250x0.jpg" alt />
          </div>
          <div class="right-recommend-body-inf">
            <div class="right-recommend-body-top">千年雄安：颠覆性技术、前沿产业与未来之都</div>
            <div class="right-recommend-body-bottom">
              <span class="right-recommend-body-bottom-person">29 人读过</span>
              <span class="right-recommend-body-bottom-read">
                <a-button icon="caret-up">阅读</a-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {}
};
</script>
<style scoped>
.right {
  width: 296px;
}
/*相关问题*/
.right-question {
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.right-question .right-question-head {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #f6f6f6;
}
.right-question .right-question-body {
  padding: 16px 20px 0px;
}
.right-question .right-question-body .right-question-body-item {
  margin-bottom: 16px;
  color: #175199;
}
.right-question-body .right-question-body-item .right-question-body-answer {
  color: #8590a6;
}

/*相关推荐*/
.right-recommend {
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.right-recommend .right-recommend-head {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #f6f6f6;
}
.right-recommend .right-recommend-body {
  padding: 16px 20px;
}
.right-recommend-body-item {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #f6f6f6;
}

.right-recommend-body-item .right-recommend-body-img img {
  width: 80px;
  height: 64px;
  border-radius: 3px;
  margin-right: 8px;
  object-fit: cover;
}
.right-recommend-body-inf {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right-recommend-body-inf .right-recommend-body-top {
  width: 165px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
.right-recommend-body-inf .right-recommend-body-bottom {
  display: flex;
  justify-content: space-between;
}
.right-recommend-body-bottom-person {
  color: #8590a6;
}
.right-recommend-body-bottom-read >>> .ant-btn {
  padding: 0px 6px;
  height: auto;
  color: #fff;
  background: #0084ff;
}
.right-recommend-body-bottom-read >>> .ant-btn span{
  margin-left: 0;
}
</style>