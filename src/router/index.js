import Vue from "vue"
import VueRouter from "vue-router"



import Index from "../views/Index/Index.vue"
import IndexBody from "../views/Body/IndexBody/Index.vue"
import FindBody from "../views/Body/FindBody/Index.vue"
import AnswerBody from "../views/Body/AnswerBody/Index.vue"
import Details from "../views/Details/Index.vue"


Vue.use(VueRouter);
export default new VueRouter({
    routes: [{
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                component: IndexBody,
            },
            {
                path: '/find',
                component: FindBody,
            },
            {
                path: '/answer',
                component: AnswerBody,
            },
        ]
    }, {
        path: '/details',
        component: Details,
    }]
})