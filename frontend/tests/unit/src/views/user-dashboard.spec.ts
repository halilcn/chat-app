import { VueWrapper } from '@vue/test-utils';

import UserDashboard from '@/views/UserDashboard.vue';
import userDashboardElement from '../../../elements/user-dashboard-element';
import renderComponent from '../../test-utils/render-component';
import store from '@/store';
import io from 'socket.io-client';
import wait from '../../../test-utils/wait';

//todo: auth için user object ?

describe('UserDashboard', function () {
  let wrapper: VueWrapper;

  const refreshComponent = () => {
    //todo:!

    store.commit('auth/setUser', { _id: 'test' });
    wrapper = renderComponent(UserDashboard, {
      global: {
        plugins: [store],
        mocks: {
          $socket: io(process.env.VUE_APP_BACKEND_URL as string, { transports: ['websocket'] })
        }
      }
    });

    //user._id)

    /*
    *
    * {global: {
        plugins: [store]
      },}
      * */
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
