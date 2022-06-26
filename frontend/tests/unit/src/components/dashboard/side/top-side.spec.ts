import { VueWrapper } from '@vue/test-utils';

import store from '@/store';
import TopSide from '@/components/dashboard/side/TopSide.vue';
import topSideElements from '../../../../../elements/top-side-elements';
import renderComponent from '../../../../test-utils/render-component';
import fakeUser, { IUser } from '../../../../test-utils/fake-user';
import fakeSocket from '../../../../test-utils/fake-socket';

describe('TopSide', function () {
  let wrapper: VueWrapper;
  let user: IUser;

  const refreshComponent = async () => {
    const createdFakeUser = await fakeUser();
    user = createdFakeUser.user;

    store.commit('auth/setUser', user);

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

  it('name item should equal nameSurname of user', async () => {
    await refreshComponent();

    expect(wrapper.find(topSideElements.name).text()).toEqual(user.nameSurname);
  });
});
