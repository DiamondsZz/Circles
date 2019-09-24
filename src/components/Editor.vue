
<template>
  <div class>
    <quill-editor :options="options" v-model="content"></quill-editor>
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
      options: {
        placeholder: "请输入问题条件、背景等详细信息（选填）",
        modules: {
          toolbar: [
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
          ]
        }
      }
    };
  },
  methods: {},
  watch: {
    isClickEditor(val) {
      console.log(this.content);
      this.$emit("editorContent", this.content);
    }
  },
  components: { quillEditor }
};
</script>
<style scoped>
</style>