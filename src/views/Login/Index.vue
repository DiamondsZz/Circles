<template>
  <div class="index">
    <div class="login">
      <a-form class="login-form" :form="form">
        <a-form-item>
          <a-input
            class="login-inp"
            placeholder="手机号"
            v-decorator="['phone', { rules: [{required:true, message: '请输入手机号' }] }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            class="login-inp"
            placeholder="密码"
            v-decorator="['password', { rules: [{ required:true ,message: '请输入密码' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset:2 }">
          <a-button class="login-btn" type="primary" @click="login">注册/登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    login() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let { phone, password } = values;
          this.$axios.post("/login", { phone, password }).then(async res => {
            if (res.data.code === 1) {
              await this.$store.commit("user", {
                user: res.data.user
              });  
              await this.$router.push("/");
            } else if (res.data.code === -1) {
              this.$message.error("手机号或密码不正确");
            }
          });
        }
      });
    }
  },
  created() {},
  components: {}
};
</script>
<style scoped>
.index {
  height: 100%;
  background-image: url("../../assets/sign_bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}
.login {
  width: 320px;
  margin: 200px auto;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.login-form {
  padding: 50px 30px 20px;
}
.login-inp {
}
.login-btn {
  width: 100%;
}
</style>