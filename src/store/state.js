export default {
   questionModal:false,   //问题详情界面  回答显示
   user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):{},//当前用户
   questionCurrent:sessionStorage.getItem("questionCurrent")?JSON.parse(sessionStorage.getItem("questionCurrent")):{},//当前问题
   isLoad:false,//是否加载
}