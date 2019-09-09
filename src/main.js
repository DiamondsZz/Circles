import Vue from 'vue'
import App from './App.vue'
import { Button, Input, Icon, message,Avatar,List,Tabs,Popover } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false


Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Avatar);
Vue.use(List);
Vue.use(Tabs);
Vue.use(Popover);
Vue.prototype.$message = message;

new Vue({
  render: h => h(App),
}).$mount('#app')
