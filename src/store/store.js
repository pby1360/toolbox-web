import { createStore } from "vuex";

import memoStore from "./memoStore";

export default createStore({
  state: {
    isLoggedIn: false,
    isLoading: false,
    user: {},
  },
  getters: {
    isLogin(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setLogin(state, value) {
      state.isLoggedIn = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setLoading(state, value) {
      state.isLoading = value;
    }
  },
  modules: {
    memoStore: memoStore,
  },
});