import { createApp } from 'vue';
import io from 'socket.io-client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

dayjs.extend(relativeTime);

app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$socket = io(process.env.VUE_APP_BACKEND_URL as string, { transports: ['websocket'] });

app.use(store).use(router).mount('#app');
