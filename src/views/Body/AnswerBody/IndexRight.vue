<!--首页内容右边 -->
<template>
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
/*内容右边部分*/
/* flex-grow 扩展量 默认为0 ，flex-shrink 收缩量 默认为1，flex-basis 初始宽度 默认为auto*/
/*将.body-right的flex-grow设置为1，由于.body-left的flex-grow为0，.body-right的宽度将自动扩展*/
.body-right {
  flex-grow: 1;
}
.body-right-write {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
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