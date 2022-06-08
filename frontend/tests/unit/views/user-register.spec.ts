import { shallowMount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

import UserRegister from '@/views/UserRegister.vue';
import userRegisterElement from '../../elements/user-register-element';

//todo: loading disable olma test ?

describe('UserRegister', function () {
  let wrapper: VueWrapper;

  const renderComponent = () => {
    wrapper = shallowMount(UserRegister);
  };

  it('button should be has the disable class when values of all items are empty', function () {
    renderComponent();

    wrapper.find(userRegisterElement.nameSurname).setValue('');
    wrapper.find(userRegisterElement.username).setValue('');
    wrapper.find(userRegisterElement.password).setValue('');

    expect(wrapper.find(userRegisterElement.registerButton).classes('disable')).toEqual(true);
  });

  it('button should be has not the disable class when values of all items are fill', async () => {
    renderComponent();

    await wrapper.find(userRegisterElement.nameSurname).setValue(faker.name.firstName());
    await wrapper.find(userRegisterElement.username).setValue(faker.internet.userName());
    await wrapper.find(userRegisterElement.password).setValue(faker.internet.password());

    expect(wrapper.find(userRegisterElement.registerButton).classes('disable')).toEqual(false);
  });
});
