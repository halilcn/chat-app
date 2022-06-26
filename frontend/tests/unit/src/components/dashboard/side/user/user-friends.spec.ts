import { VueWrapper } from '@vue/test-utils';

import store from '@/store';
import UserFriends from '@/components/dashboard/side/user/UserFriends.vue';
import fakeUser, { IUser } from '../../../../../test-utils/fake-user';
import fakeSocket from '../../../../../test-utils/fake-socket';
import renderComponent from '../../../../../test-utils/render-component';

describe('UserFriends', function () {
  let wrapper: VueWrapper;
  let user: IUser;

  const refreshComponent = async () => {
    const createdFakeUser = await fakeUser();
    user = createdFakeUser.user;

    store.commit('auth/setUser', user);

    wrapper = renderComponent(UserFriends, {
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
});
