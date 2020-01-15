export default {
   questionModal:false,   //问题详情界面  回答显示
   user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):{},//当前用户
}