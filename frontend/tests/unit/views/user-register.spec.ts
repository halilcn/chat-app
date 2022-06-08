import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import UserRegister from '@/views/UserRegister.vue';

import userRegisterElement from '../../elements/user-register-element';

const displayGreeting = {
  template: '<div>Hello, {{ name }}</div>',
  data: () => ({ name: 'George' })
};

//todo: vue dosyalarıı import olmuyor ?

describe('UserRegister', function () {
  it('deneme testi', function () {
    const wrapper = mount(displayGreeting);

    expect(wrapper.find(userRegisterElement.nameSurname).exists()).toEqual(false);
  });

  it('deneme testi 2', function () {
    const wrapper = shallowMount(UserRegister);

    expect(wrapper.find(userRegisterElement.username).exists()).toEqual(true);
  });
});
