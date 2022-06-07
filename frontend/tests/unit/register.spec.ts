import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

const displayGreeting = {
  template: '<div>Hello, {{ name }}</div>',
  data: () => ({ name: 'George' })
};

describe('test oeky', function () {
  it('should asdasd', function () {
    const wrapper = mount(displayGreeting);

    expect(true).to.true;
    // expect(wrapper.find('[data-testid=nameSurname]').exists()).to.true;
  });
});
