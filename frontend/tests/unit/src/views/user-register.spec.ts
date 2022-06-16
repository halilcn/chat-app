import { VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

import UserRegister from '@/views/UserRegister.vue';
import userRegisterElement from '../../../elements/user-register-element';
import renderComponent from '../../test-utils/render-component';

describe('UserRegister', () => {
  let wrapper: VueWrapper;

  const refreshComponent = () => {
    wrapper = renderComponent(UserRegister);
  };

  it('button should be has the disable class when values of all items are empty', async () => {
    refreshComponent();

    await wrapper.find(userRegisterElement.nameSurname).setValue('');
    await wrapper.find(userRegisterElement.username).setValue('');
    await wrapper.find(userRegisterElement.password).setValue('');

    expect(wrapper.find(userRegisterElement.registerButton).classes('disable')).toEqual(true);
  });

  it('button should be has not the disable class when values of all items are fill', async () => {
    refreshComponent();

    await wrapper.find(userRegisterElement.nameSurname).setValue(faker.name.firstName());
    await wrapper.find(userRegisterElement.username).setValue(faker.internet.userName());
    await wrapper.find(userRegisterElement.password).setValue(faker.internet.password());

    expect(wrapper.find(userRegisterElement.registerButton).classes('disable')).toEqual(false);
  });
});
