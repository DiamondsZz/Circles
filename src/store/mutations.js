export default {
  //问题详情界面   回答问题面板
  questionModal(state, { questionModal }) {
    state.questionModal = questionModal;
  },
  user(state, { user }) {
    state.user = user;
    sessionStorage.setItem("user", JSON.stringify(user))
  }
}