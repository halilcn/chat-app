import { VueWrapper } from '@vue/test-utils';
import io from 'socket.io-client';

import UserDashboard from '@/views/UserDashboard.vue';
import userDashboardElement from '../../../elements/user-dashboard-element';
import renderComponent from '../../test-utils/render-component';
import wait from '../../../test-utils/wait';
import testConfig from '../../../test-utils/test-config';
import store from '@/store';

describe('UserDashboard', function () {
  let wrapper: VueWrapper;

  const refreshComponent = () => {
    //todo:register olup, login olacak. ardıdan vuex'e göndereceğiz
    console.log(testConfig.API_URL_V1);

    store.commit('auth/setUser', { _id: 'test' });

    wrapper = renderComponent(UserDashboard, {
      global: {
        plugins: [store],
        mocks: {
          $socket: io(testConfig.API_URL, { transports: ['websocket'] })
        }
      }
    });
  };

  it('should be loading when first render', async () => {
    refreshComponent();

    expect(wrapper.find(userDashboardElement.loading).exists()).toBeTruthy();
  });

  it('should be left side and main content after render component', async () => {
    refreshComponent();

    await wait(2000);

    expect(wrapper.find(userDashboardElement.leftSide).exists()).toBeTruthy();
    expect(wrapper.find(userDashboardElement.mainContent).exists()).toBeTruthy();
  });
});
