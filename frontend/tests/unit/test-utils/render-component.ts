import { shallowMount, VueWrapper } from '@vue/test-utils';

import UserLogin from '@/views/UserLogin.vue';
import store from '@/store';

export default (component: any, options: object = {}): VueWrapper => {
  return shallowMount(UserLogin, {
    ...options,
    global: {
      plugins: [store]
    }
  });
};
