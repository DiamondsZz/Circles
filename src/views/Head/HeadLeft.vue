<!-- 首页头部左边 -->
<template>
  <div class="head-content-left">
    <div class="head-content-left-logo"></div>
    <div class="head-content-left-menu">
      <div
        v-for="(item,i) in menus"
        :key="i"
        class="head-content-left-menu-item"
        @click="menuClick(item)"
      >
        <span :class="{'head-content-left-menu-item-active':item===menuCurrent}">{{item}}</span>
      </div>
    </div>
    <div class="head-content-left-action">
      <a-input-search
        class="head-content-left-search"
        :class="{'head-content-left-search-focus':!quesBtn}"
        @change="search"
        @focus="focus"
        @blur="blur"
      />
      <transition name="head-content-left-question">
        <a-button
          class="head-content-left-question"
          type="primary"
          v-if="quesBtn"
          @click="question"
        >提问</a-button>
      </transition>
    </div>

    <a-modal
      :visible="questionModal"
      :centered="true"
      :closable="false"
      :footer="null"
      :width="650"
      @cancel="questionModal=false"
    >
      <div class="ques-til">
        <div class="ques-til-l">
          <img src="https://pic2.zhimg.com/ebba3f748_xs.jpg" alt />
        </div>
        <div class="ques-til-r">
          <div class="ques-til-inp">
            <a-textarea
              v-model="quesTil"
              placeholder="写下你的问题，准确地描述问题更容易得到解答"
              @change="quesTilChange"
            ></a-textarea>
          </div>
          <div
            class="ques-til-mes"
            :class="{'ques-til-mes-color':quesTil.length>=40&&quesTil.length<50}"
          >{{quesTip}}</div>
        </div>
      </div>
      <transition name="ques-des">
        <div class="ques-des" v-if="quesTil!==''">
          <editor class="editor" :isClickEditor="isClickEditor" @editorContent="getEditorContent"></editor>
        </div>
      </transition>
      <div class="ques-foot">
        <a-checkbox>匿名提问</a-checkbox>
        <a-button class="ques-btn" type="primary" @click="questionSend">发布问题</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Editor from "../../components/Editor";
export default {
  data() {
    return {
      //当前导航菜单
      menuCurrent: this.$route.meta.name, //初始值为当前激活路由的元信息name。（组件创建时进行当前菜单选项的初始化）
      //提问按钮显示与否
      quesBtn: true,
      //导航菜单
      menus: ["首页", "发现", "等你来答"],
      questionModal: false,
      quesTil: "",
      quesTip: "",
      isClickEditor: false,
      quesContent: ""
    };
  },
  methods: {
    //路由调用
    router(path) {
      this.$router.push(path);
    },
    //搜索框进行搜索
    search() {},
    //搜索框聚焦
    focus() {
      this.quesBtn = false;
    },
    //搜索框失去焦点
    blur() {
      this.quesBtn = true;
    },

    //头部菜单点击
    menuClick(menu) {
      this.menuCurrent = menu;
      switch (menu) {
        case "首页":
          this.router("/");
          break;
        case "发现":
          this.router("/find");
          break;
        case "等你来答":
          this.router("/answer");
          break;
        default:
          this.router("/");
      }
    },
    //点击头部菜单提问按钮
    question() {
      this.questionModal = true;
    },
    //问题输入框内容改变
    quesTilChange() {
      if (this.quesTil.length < 4) {
        this.quesTip = "至少输入4个字";
      } else if (this.quesTil.length <= 50) {
        this.quesTip = "";
        if (this.quesTil.length > 40) {
          this.quesTip = `还可以输入${50 - this.quesTil.length}个字`;
        }
      } else if (this.quesTil.length > 50) {
        this.quesTip = `已超出${this.quesTil.length - 50}个字`;
      } else if (this.quesTil.length > 80) {
        this.quesTip = "最多输入50个字";
      }
    },

    //提问内容提交
    async questionSend() {
      this.isClickEditor = !this.isClickEditor; //监听编辑器的状态   是否点击发布问题按钮
      await this.getEditorContent(); //直到获取编辑器最新内容更新才执行下一步
      this.$axios
        .post("/question/ask", {
          til: this.quesTil,
          content: this.quesContent
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.questionModal = false;
          }
        });
    },

    //获取编辑器返回的文本内容
    getEditorContent(content) {
      this.quesContent = content;
    }
  },
  watch: {
    //监听同级路由状态信息 （同级路由改变时进行当前菜单选项的切换）
    $route() {
      this.menuCurrent = this.$route.meta.name;
    }
  },
  created() {},
  components: { Editor }
};
</script>
<style scoped>
/*头部左边*/
.head-content-left {
  display: flex;
}
.head-content-left-logo {
  display: flex;
  align-items: center;
}
.head-content-left-menu {
  display: flex;
  margin: 0 23px;
}
.head-content-left-menu .head-content-left-menu-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #8590a6;
  padding: 0px 17px;
  cursor: pointer;
}
.head-content-left-menu .head-content-left-menu-item-active {
  position: relative;
  color: #444;
  padding: 14px 0;
  font-weight: 600;
}
.head-content-left-menu .head-content-left-menu-item-active::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  height: 3px;
  background-color: #0084ff;
}
.head-content-left-action {
  display: flex;
  align-items: center;
}
.head-content-left-search {
  width: 326px;
  transition: width 0.5s;
}
.head-content-left-search-focus {
  width: 400px;
}
.head-content-left-search >>> .ant-input {
  background-color: #f6f6f6;
}
.head-content-left-search >>> .ant-input-search-icon {
  font-size: 18px;
}
/*提问按钮显示隐藏动画*/
.head-content-left-question {
  margin-left: 16px;
  padding: 0 10px;
}
.head-content-left-question-enter,
.head-content-left-question-leave-to {
  transform: scale(0);
}
.head-content-left-question-enter-active,
.head-content-left-question-leave-active {
  transition: all 0.2s;
}

/*提问窗口*/
.ques-foot {
  display: flex;
  justify-content: space-between;
}
.ques-til {
  height: 64px;
  display: flex;
  margin-bottom: 10px;
}
.ques-til .ques-til-l {
  flex-shrink: 0;
  margin-right: 10px;
}
.ques-til .ques-til-l img {
  width: 40px;
  height: 40px;
}
.ques-til .ques-til-r {
  flex-grow: 1;
}
.ques-til .ques-til-r .ques-til-inp {
  height: 40px;
}
.ques-til .ques-til-r .ques-til-inp textarea {
  width: 100%;
  height: 100%;
  padding: 5px;
  outline: none;
  border: none;
  resize: none;
  font-size: 16px;
  color: #1a1a1a;
}
.ques-til .ques-til-r .ques-til-mes {
  margin: 5px 0;
  min-height: 24px;
  color: #f1403c;
  font-size: 15px;
  text-align: right;
}
.ques-til .ques-til-r .ques-til-mes-color {
  color: #8590a6;
}
.ques-des {
  margin: 10px 0;
}

/*编辑器*/

.editor >>> .ql-container {
  height: 200px;
}
</style>