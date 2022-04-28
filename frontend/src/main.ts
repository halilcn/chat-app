import { createApp } from 'vue';
import io from 'socket.io-client';

import App from './App.vue';
import router from './router';
import store from './store';
import dayjs from 'dayjs';

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$socket = io(process.env.VUE_APP_BACKEND_URL, { transports: ['websocket'] });

app.use(store).use(router).mount('#app');
