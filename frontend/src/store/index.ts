import { createStore } from 'vuex';
import axios from 'axios';

import auth from '@/store/modules/auth';
import userSetting from '@/store/modules/user-setting';

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE_URL;
//axios.defaults.headers.common['Authorization'] = '';//auth.state.user?.token;

export default createStore({
  modules: {
    auth,
    userSetting
  }
});
