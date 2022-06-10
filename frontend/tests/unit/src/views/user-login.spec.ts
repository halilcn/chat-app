import { VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

import UserLogin from '@/views/UserLogin.vue';
import userLoginElement from '../../../elements/user-login-element';
import renderComponent from '../../test-utils/render-component';

describe('UserLogin', function () {
  let wrapper: VueWrapper;

  const refreshComponent =  () => {
    wrapper = renderComponent(UserLogin);
  };

  it('button should be has the disable class when values of all items are empty', async () => {
    refreshComponent();

    await wrapper.find(userLoginElement.username).setValue('');
    await wrapper.find(userLoginElement.password).setValue('');

    expect(wrapper.find(userLoginElement.loginButton).classes('disable')).toEqual(true);
  });

  it('button should be has not the disable class when values of all items are fill', async () => {
    refreshComponent();

    await wrapper.find(userLoginElement.username).setValue(faker.internet.userName());
    await wrapper.find(userLoginElement.password).setValue(faker.internet.password());

    expect(wrapper.find(userLoginElement.loginButton).classes('disable')).toEqual(false);
  });

  it('wrong error message should show after post wrong email or password', async () => {
    refreshComponent();

    await wrapper.find(userLoginElement.username).setValue(faker.random.words());
    await wrapper.find(userLoginElement.password).setValue(faker.random.words());

    await wrapper.find(userLoginElement.loginButton).trigger('click');

    //todo:setTimeout ?
    setTimeout(() => {
      expect(wrapper.find(userLoginElement.wrongError).exists()).toEqual(true);
    }, 1000);
  });
});
