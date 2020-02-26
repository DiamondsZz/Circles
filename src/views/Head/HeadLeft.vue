<!-- 首页头部左边 -->
<template>
  <div class="head-content-left">
    <div class="head-content-left-logo">
      <img src="@/assets/logo.png" alt />
    </div>
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
      <a-auto-complete
        class="head-content-left-search"
        :class="{'head-content-left-search-focus':!quesBtn}"
        @change="search"
        @focus="focus"
        @blur="blur"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="(ques) in quesSearchRelative"
            :key="ques.til"
            @click="showQuestion(ques)"
          >{{ques.til}}</a-select-option>
        </template>
      </a-auto-complete>
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
          <img :src="$store.state.user.userImg" alt />
        </div>
        <div class="ques-til-r">
          <div class="ques-til-input">
            <a-auto-complete
              class="ques-til-inp"
              v-model="quesTil"
              placeholder="写下你的问题，准确地描述问题更容易得到解答"
              :open="quesTilOpen"
              @blur="quesTilBlur"
              @focus="quesTilFocus"
              @change="quesTilChange"
            >
              <template slot="dataSource">
                <a-select-option v-if="quesSearchRelative.length>0" disabled key="til">相关类似问题</a-select-option>
                <a-select-option
                  v-for="(ques) in quesSearchRelative"
                  :key="ques.til"
                  @click="showQuestion(ques)"
                >{{ques.til}}</a-select-option>
              </template>
            </a-auto-complete>
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
      <div class="ques-type">
        <span v-if="tags.length>0">
          <a-tag
            color="#0084ff"
            closable
            v-for="(item,i) in tags "
            :key="i"
            @close="closeTag(item,i)"
          >{{item}}</a-tag>
        </span>
        <span>
          <a-auto-complete
            v-if="isAddTag"
            size="small"
            class="ques-search"
            :dataSource="quesTypes"
            @select="quesTypeSelect"
            @search="quesTypeSearch"
            @blur="isAddTag=false"
          />
          <span v-if="!isAddTag&&tags.length<5" @click="isAddTag=!isAddTag">
            <a-icon type="plus"></a-icon>添加话题
            <span v-if="tags.length===0">(至少添加一个话题)</span>
            <span v-if="tags.length>0">({{tags.length}}/5)</span>
          </span>
        </span>
      </div>
      <div class="ques-foot">
        <a-checkbox>匿名提问</a-checkbox>
        <a-button class="ques-btn" type="primary" @click="questionSend">发布问题</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Editor from "../../components/Editor";
import Lodash from "lodash";
export default {
  data() {
    return {
      thisPointer: this,
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
      quesContent: "",
      quesText: "",
      quesCover: "",
      tags: [], //问题分类
      isAddTag: false, //是否添加分类
      quesTypes: [],
      quesSearchRelative: [], //搜索相关问题
      quesTilOpen: true
    };
  },
  methods: {
    //路由调用
    router(path) {
      this.$router.push(path);
    },
    //进入问题页面
    showQuestion(item) {
      if (this.$route.query.id !== item._id) {
        this.$router.push({
          path: "details",
          query: { id: item._id }
        });
      }
    },
    //搜索框进行搜索
    search: Lodash.debounce(function(val) {
      if (val.trim() !== "") {
        this.$axios
          .post("/question/get/search", { search: val.trim() })
          .then(res => {
            if (res.status === 200) {
              this.quesSearchRelative = res.data;
            }
          });
      }
    }, 500),
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
    quesTilChange: Lodash.debounce(function(val) {
      //问题标题为空时对应的自动提示隐藏
      this.quesTilAutoComplete();
      //对用户输入进行校验
      if (this.quesTil.length < 4) {
        this.quesTip = "至少输入4个字";
      } else if (this.quesTil.length <= 50) {
        this.quesTip = "";
        // if (this.quesTil.length > 40) {
        //   this.quesTip = `还可以输入${50 - this.quesTil.length}个字`;
        // }
      } else if (this.quesTil.length > 50) {
        this.quesTip = `已超出${this.quesTil.length - 50}个字`;
      } else if (this.quesTil.length > 80) {
        this.quesTip = "最多输入50个字";
      }
      if (val.trim() !== "") {
        this.$axios
          .post("/question/get/search", { search: val.trim() })
          .then(res => {
            if (res.status === 200) {
              this.quesSearchRelative = res.data;
            }
          });
      }
    }, 500),
    //问题标题自动提示框显示校验
    quesTilAutoComplete() {
      if (this.quesTil.trim() === "") {
        this.quesTilOpen = false;
      } else {
        this.quesTilOpen = true;
      }
    },
    //问题标题失去焦点
    quesTilBlur() {
      this.quesTilOpen = false;
    },
    //问题标题获得焦点
    quesTilFocus() {
      this.quesTilOpen = true;
    },
    //提问内容提交
    async questionSend() {
      this.isClickEditor = !this.isClickEditor; //监听编辑器的状态   是否点击发布问题按钮
      await this.getEditorContent(); //直到获取编辑器最新内容更新才执行下一步
      if (this.checkQuestion()) {
        this.$store.commit("isLoad", {
          isLoad: true
        });
        this.$axios
          .post("/question/ask", {
            user: this.$store.state.user._id,
            til: this.quesTil.trim(),
            content: this.quesContent,
            text: this.quesText,
            type: this.tags,
            cover: this.quesCover
          })
          .then(res => {
            if (res.status === 200) {
              this.$store.commit("isLoad", {
                isLoad: false
              });
              this.questionModal = false;
              this.$message.success("发布成功");
            }
          });
      }
    },

    //获取编辑器返回的文本内容
    getEditorContent(val) {
      if (val) {
        this.quesContent = val.content;
        this.quesText = val.text;
        this.quesCover = val.cover;
      }
    },
    judgeIsHasQues() {
      let res = this.quesSearchRelative.find(ques => {
        return ques.til === this.quesTil;
      });
      return !!res;
    },
    checkQuestion() {
      if (this.quesTil === "") {
        this.$message.error("问题标题不能为空");
        return false;
      } else if (this.tags.length === 0) {
        this.$message.error("至少添加一个话题");
        return false;
      } else {
        if (this.quesTip !== "") {
          this.$message.error(this.quesTip);
          return false;
        } else {
          if (!this.quesText.trim()) {
            if (this.quesContent.indexOf("img") === -1) {
              this.$message.error("请详细描述你的问题");
              return false;
            }
          } else {
            if (
              this.quesTil.slice(this.quesTil.length - 1) !== "？" &&
              this.quesTil.slice(this.quesTil.length - 1) !== "?"
            ) {
              this.$message.error("问题标题请以问号结尾");
              return false;
            } else {
              if (this.judgeIsHasQues()) {
                this.$message.error("该问题已经存在");
                return false;
              } else {
                return true;
              }
            }
          }
        }
      }
      return true;
    },
    //问题类型选择
    quesTypeSelect(item) {
      if (this.tags.indexOf(item) !== -1) {
        this.$message.error("已经添加过该话题");
      } else {
        this.tags.push(item);
        this.isAddTag = false;
      }
    },
    //问题类型查询
    quesTypeSearch(des) {
      this.$axios.get("/question/type/get", { params: { des } }).then(res => {
        if (res.status === 200) {
          this.quesTypes = res.data;
        }
      });
    },
    closeTag(item, i) {
      this.tags.splice(i, 1);
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
.head-content-left-logo img {
  width: 100px;
  height: 40px;
}
.head-content-left-menu {
  display: flex;
  flex-shrink: 0;
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
.ques-til .ques-til-r .ques-til-input .ques-til-inp {
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
.ques-search {
  width: 160px;
  margin: 0 10px;
}
.ques-type {
  color: #0084ff;
  margin-bottom: 16px;
  cursor: pointer;
}
/*编辑器*/

.editor >>> .ql-container {
  height: 200px;
}
</style>