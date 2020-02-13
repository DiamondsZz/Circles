import Vue from "vue"
import VueRouter from "vue-router"



import Index from "../views/Index/Index.vue"
import IndexBody from "../views/Body/IndexBody/Index.vue"
import FindBody from "../views/Body/FindBody/Index.vue"
import AnswerBody from "../views/Body/AnswerBody/Index.vue"
import MessageBody from "../views/Body/MessageBody/Index.vue"
import Details from "../views/Details/Index.vue"
import Login from "../views/Login/Index.vue"

Vue.use(VueRouter);
export default new VueRouter({
    routes: [{
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                component: IndexBody,
                meta: {
                    name: "首页"
                }
            },
            {
                path: '/find',
                component: FindBody,
                meta: {
                    name: "发现"
                },
            },
            {
                path: '/answer',
                component: AnswerBody,
                meta: {
                    name: "等你来答"
                }
            }, {
                path: '/message',
                component: MessageBody,
                meta: {
                    name: "通知中心"
                }
            },
        ]
    }, {
        path: '/details',
        component: Details,
    }, {
        path: '/login',
        component: Login,
    }]
})