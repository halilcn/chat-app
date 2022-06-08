import { shallowMount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

import UserLogin from '@/views/UserLogin.vue';
import userLoginElement from '../../elements/user-login-element';

//todo: yeni testler

describe('UserLogin', function () {
  let wrapper: VueWrapper;

  const renderComponent = () => {
    wrapper = shallowMount(UserLogin);
  };

  it('button should be has the disable class when values of all items are empty', async () => {
    renderComponent();

    await wrapper.find(userLoginElement.username).setValue('');
    await wrapper.find(userLoginElement.password).setValue('');

    expect(wrapper.find(userLoginElement.loginButton).classes('disable')).toEqual(true);
  });

  it('button should be has not the disable class when values of all items are fill', async () => {
    renderComponent();

    await wrapper.find(userLoginElement.username).setValue(faker.internet.userName());
    await wrapper.find(userLoginElement.password).setValue(faker.internet.password());

    expect(wrapper.find(userLoginElement.loginButton).classes('disable')).toEqual(false);
  });
});
