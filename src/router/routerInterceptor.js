import router from "./index"
router.beforeEach((to, from, next) => {
    if (to.meta.name !== "login") {
        if (!!sessionStorage.getItem("user")) {
            next()
        } else {
            router.push("login");
            next();
        }
    } else {
        next();
    }


})