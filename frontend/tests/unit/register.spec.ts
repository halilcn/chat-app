import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import userRegisterElement from '../elements/user-register-element';

const displayGreeting = {
  template: '<div>Hello, {{ name }}</div>',
  data: () => ({ name: 'George' })
};

//todo: vue dosyalarıı import olmuyor ?

describe('Register', function () {
  it('deneme testi', function () {
    const wrapper = mount(displayGreeting);

    expect(wrapper.find(userRegisterElement.nameSurname).exists()).toEqual(false);
  });
});
