import { VueWrapper } from '@vue/test-utils';

import TopSide from '@/components/dashboard/side/TopSide.vue';
import topSideElements from '../../../../../elements/top-side-elements';
import renderComponent from '../../../../test-utils/render-component';
import fakeUser from '../../../../test-utils/fakeUser';
import store from '@/store';
import fakeSocket from '../../../../test-utils/fakeSocket';

describe('TopSide', function () {
  let wrapper: VueWrapper;
  let user: { [key: string]: any };

  const refreshComponent = async () => {
    const createdFakeUser = await fakeUser();

    user = createdFakeUser.user;

    store.commit('auth/setUser', createdFakeUser.user);

    wrapper = renderComponent(TopSide, {
      global: {
        plugins: [store],
        mocks: {
          $socket: fakeSocket()
        }
      }
    });
  };

  it('should render component without crashing', async () => {
    await refreshComponent();

    expect(wrapper).toBeTruthy();
  });

  it('all elements should be complete', async () => {
    await refreshComponent();

    expect(wrapper.find(topSideElements.userSettingsButton).exists()).toBeTruthy();
    expect(wrapper.find(topSideElements.friendsButton).exists()).toBeTruthy();
  });
});
