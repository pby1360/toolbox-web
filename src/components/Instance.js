import axios from "axios"; 
import store from "@/store";

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
    return Promise.reject(error);
  }
);

export default instance;