import axios from "axios"; 
import store from "@/store/store.js";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type":"application/json",
  }
});
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = store.getters.getUser.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.data == 'TOKEN_EXPIRED') {
      alert('Authentication expired!');

      store.commit('setUser', {});
      store.commit('setLogin', false);
      localStorage.removeItem('auth');

      location.replace('/login');
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;