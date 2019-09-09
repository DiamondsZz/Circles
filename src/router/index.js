import Vue from "vue"
import VueRouter from "vue-router"



import Index from "../views/Body/Index.vue"
import Body from "../views/Body/Body.vue"
import Details from "../views/Details/Index.vue"


Vue.use(VueRouter);
export default new VueRouter({
    routes: [{
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                component: Body,
            },
            {
                path: '/details',
                component: Details,
            }]
    }]
})