import { VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import store from '@/store';
import UserList from '@/components/dashboard/side/user/UserList.vue';
import userListElements from '../../../../../../elements/user-list-elements';
import renderComponent from '../../../../../test-utils/render-component';
import fakeUser, { IUser } from '../../../../../test-utils/fake-user';
import fakeSocket from '../../../../../test-utils/fake-socket';

describe('UserList', function () {
  let wrapper: VueWrapper;
  let user: IUser;

  const refreshComponent = async () => {
    const createdFakeUser = await fakeUser();
    user = createdFakeUser.user;

    store.commit('auth/setUser', user);

    wrapper = renderComponent(UserList, {
      global: {
        plugins: [store],
        mocks: {
          $socket: fakeSocket(),
          $dayjs: dayjs
        }
      }
    });
  };

  it('should render component without crashing', async () => {
    await refreshComponent();

    expect(wrapper).toBeTruthy();
  });

  describe('user list element', () => {
    it('should be enable when user list on store has a message', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 0
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      expect(wrapper.find(userListElements.userList).exists()).toBeTruthy();
    });

    it('should not be enable when user list on store has not any messages', async () => {
      await refreshComponent();

      expect(wrapper.find(userListElements.userList).exists()).not.toBeTruthy();
    });
  });

  describe('length of list item', () => {
    it('should be equal 1 when user list on store has a message', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 0
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      expect(wrapper.findAll(userListElements.userListItem).length).toEqual(1);
    });

    it('should not be equal 1 when user list on store has not any messages', async () => {
      await refreshComponent();

      expect(wrapper.findAll(userListElements.userListItem).length).toEqual(0);
    });
  });

  describe('user list item element', () => {
    it('should include selected class when click the message', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 0,
          friendId: faker.datatype.uuid()
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      await wrapper.find(userListElements.userListItem).trigger('click');

      expect(wrapper.find(userListElements.userListItem).classes().includes('selected')).toBeTruthy();
    });

    it('should not include not-readed class when unread message count is 0', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 0,
          friendId: faker.datatype.uuid()
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      expect(wrapper.find(userListElements.userListItem).classes().includes('not-readed')).not.toBeTruthy();
    });

    it('should include not-readed class when unread message count is 1', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 1,
          friendId: faker.datatype.uuid()
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      expect(wrapper.find(userListElements.userListItem).classes().includes('not-readed')).toBeTruthy();
    });
  });

  describe('total unread messages count element', () => {
    it('should enable when unread message count is 1', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 1,
          friendId: faker.datatype.uuid()
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      expect(wrapper.find(userListElements.totalUnreadMessage).exists()).toBeTruthy();
    });

    it('should not enable when unread message count is 0', async () => {
      const userListMessages = [
        {
          user: {
            _id: faker.datatype.uuid(),
            image: faker.image.imageUrl(),
            nameSurname: faker.name.firstName()
          },
          lastMessage: {
            content: faker.lorem.text(),
            createdAt: faker.date.past()
          },
          unReadMessagesCount: 0,
          friendId: faker.datatype.uuid()
        }
      ];

      store.commit('message/setUserListMessages', userListMessages);

      await refreshComponent();

      expect(wrapper.find(userListElements.totalUnreadMessage).exists()).not.toBeTruthy();
    });
  });
});
