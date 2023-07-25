import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: {},
  },
  getters: {
    isLogin(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    }

  },
  mutations: {
    setLogin(state, value) {
      state.isLoggedIn = value;
    },
    setUser(state, value) {
      state.user = value;
    }
  }
});