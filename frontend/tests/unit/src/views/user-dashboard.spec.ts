import { VueWrapper } from '@vue/test-utils';

import UserDashboard from '@/views/UserDashboard.vue';
import userDashboardElement from '../../../elements/user-dashboard-element';
import renderComponent from '../../test-utils/render-component';
import wait from '../../../test-utils/wait';
import store from '@/store';
import fakeUser from '../../test-utils/fakeUser';
import fakeSocket from '../../test-utils/fakeSocket';

describe('UserDashboard', function () {
  let wrapper: VueWrapper;

  const refreshComponent = async () => {
    const { user } = await fakeUser();

    store.commit('auth/setUser', user);

    wrapper = renderComponent(UserDashboard, {
      global: {
        plugins: [store],
        mocks: {
          $socket: fakeSocket()
        }
      }
    });
  };

  it('should be loading when first render', async () => {
    await refreshComponent();

    expect(wrapper.find(userDashboardElement.loading).exists()).toBeTruthy();
  });

  it('should be left side and main content after render component', async () => {
    await refreshComponent();

    await wait(2000);

    expect(wrapper.find(userDashboardElement.leftSide).exists()).toBeTruthy();
    expect(wrapper.find(userDashboardElement.mainContent).exists()).toBeTruthy();
  });
});
