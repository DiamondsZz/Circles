<!--富文本编辑器-->
<template>
  <div class>
    <quill-editor ref="quill" :options="options" v-model="content" @change="editorChange"></quill-editor>
    <a-upload
      v-show="false"
      id="upload"
      ref="upload"
      name="file"
      :customRequest="imgUpload"
      @change="uploadChange"
    ></a-upload>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  props: ["isClickEditor"],
  data() {
    return {
      content: "",
      text: "",
      imgList: [], //fileList图片列表
      imgs: [], // {uid,base64}
      imgsUpload: [], //需要上传的图片
      imgCover: "", //回答封面
      options: {
        placeholder: "请输入问题条件、背景等详细信息（选填）",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, 7] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image"]
            ],
            handlers: {
              image: () => {
                document.getElementById("upload").click();
              }
            }
          }
        }
      }
    };
  },
  methods: {
    editorChange(res) {
      this.text = res.text;
    },
    //覆盖原来的文件上传
    imgUpload(e) {},
    uploadChange({ file, fileList }) {
      if (file.size / 1024 > 5) {
        return this.$message.error("上传图片不能大于5KB");
      } else {
        let quill = this.$refs.quill.quill;
        let fileReader = new FileReader();
        this.imgList = fileList;
        fileReader.readAsDataURL(file.originFileObj);
        fileReader.onloadend = e => {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片
          quill.insertEmbed(length, "image", e.target.result);
          // 调整光标到最后
          quill.setSelection(length + 1);
          this.$emit("editorContent", {
            content: this.content,
            text: this.text,
            cover: this.imgCover
          });
          this.imgs.push({
            base64: e.target.result,
            file
          });
        };
      }
    },
    //上传图片
    upload(img) {
      let formData = new FormData();
      formData.append("uploadFile", img.originFileObj);
      return this.$axios
        .post("/image/upload", formData, {
          headers: { "Content-Type": "multiple/form-data" }
        })
        .then(res => {
          if (res.status === 200) {
            return res.data;
          }
        });
    }
  },
  watch: {
    //监听是否点击编辑器的发布按钮
    async isClickEditor(val) {
      let imgsResult = []; //筛选后的图片file数组
      this.imgsUpload = this.content.match(new RegExp("<img.+?>", "g"));
      if (this.imgsUpload) {
        for (let imgUpload of this.imgsUpload) {
          let base64 = imgUpload.slice(
            imgUpload.indexOf('"') + 1,
            imgUpload.lastIndexOf('"')
          );
          let imgResult = this.imgs.find(img => {
            return img.base64 === base64;
          });
          imgsResult.push(imgResult.file);
        }
      }
      if (imgsResult.length > 0) {
        this.imgCover = await this.upload(imgsResult[0]);
      }
      this.$emit("editorContent", {
        content: this.content,
        text: this.text,
        cover: this.imgCover
      });
    }
  },
  components: { quillEditor }
};
</script>
<style scoped>
</style>