import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index.js';
import axios from 'axios';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

loadFonts()

const app = createApp(App);

// 전역설정
app.config.globalProperties.axios = axios;

app.use(router);
app.use(vuetify);

app.mount('#app');