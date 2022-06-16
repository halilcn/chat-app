import { shallowMount, VueWrapper } from '@vue/test-utils';

import store from '@/store';

export default (component: any, options: object = {}): VueWrapper => {
  return shallowMount(component, {
    ...options,
    global: {
      plugins: [store]
    }
  });
};
