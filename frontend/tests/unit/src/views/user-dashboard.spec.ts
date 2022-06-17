import { VueWrapper } from '@vue/test-utils';

import UserDashboard from '@/views/UserDashboard.vue';
import userDashboardElement from '../../../elements/user-dashboard-element';
import renderComponent from '../../test-utils/render-component';

//todo: auth için user object ?

describe('UserDashboard', function () {
  let wrapper: VueWrapper;

  const refreshComponent = () => {
    wrapper = renderComponent(UserDashboard);
  };

  it('should be left side and main content', async () => {
    refreshComponent();

    expect(wrapper.find(userDashboardElement.leftSide).exists()).toBeTruthy();
    expect(wrapper.find(userDashboardElement.mainContent).exists()).toBeTruthy();
  });
});
