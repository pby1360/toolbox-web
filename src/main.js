import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios';


const app = createApp(App);

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// 전역설정
app.config.globalProperties.axios = axios;

app.mount('#app')

