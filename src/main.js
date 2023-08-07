import { createApp } from 'vue'

import App from './App.vue'

import router from '@/router/index.js';
import authAxios from 'axios';
import axios from './components/Instance';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

import { loadFonts } from './plugins/webfontloader'

import store from './store';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

loadFonts()

const app = createApp(App);

// 전역설정
app.config.globalProperties.authAxios = authAxios;
app.config.globalProperties.axios = axios;
app.config.globalProperties.store = store;

app.use(router);
app.use(vuetify);
app.use(store);

app.mount('#app');