import { VueWrapper } from '@vue/test-utils';

import LoadingDashboard from '@/components/dashboard/others/LoadingDashboard.vue';
import renderComponent from '../../../../test-utils/render-component';

describe('UserDashboard', function () {
  let wrapper: VueWrapper;

  const refreshComponent = () => {
    wrapper = renderComponent(LoadingDashboard);
  };

  it('should render component without crashing', () => {
    refreshComponent();

    expect(wrapper).toBeTruthy();
  });
});
