import Vue from 'vue'
import VueRouter from "./router"
import App from './App.vue'
import {Button, Input, Icon, message, Avatar, List, Tabs, Popover, Tag, Modal, Checkbox, Pagination } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import "./assets/css/public.css"
import "./axios";
import store from "./store"

Vue.config.productionTip = false


Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Avatar);
Vue.use(List);
Vue.use(Tabs);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Modal);
Vue.use(Checkbox);
Vue.use(Pagination);
Vue.prototype.$message = message;

new Vue({
    store,
    router: VueRouter,
    render: h => h(App),
}).$mount('#app')