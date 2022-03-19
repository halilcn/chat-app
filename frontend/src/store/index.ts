import { createStore } from 'vuex';
import axios from 'axios';

import auth from '@/store/modules/auth';

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE_URL;
//axios.defaults.headers.common['Authorization'] = '';//auth.state.user?.token;

export default createStore({
  modules: {
    auth
  }
});
