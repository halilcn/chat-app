import { VueWrapper } from '@vue/test-utils';

import LeftSideWrapper from '@/components/dashboard/side/LeftSideWrapper.vue';
import leftSideWrapperElements from '../../../../../elements/left-side-wrapper-elements';
import renderComponent from '../../../../test-utils/render-component';

describe('LeftSideWrapper', function () {
  let wrapper: VueWrapper;

  const refreshComponent = () => {
    wrapper = renderComponent(LeftSideWrapper);
  };

  it('should render component without crashing', () => {
    refreshComponent();

    expect(wrapper).toBeTruthy();
  });

  it('all components should be complete', () => {
    refreshComponent();

    expect(wrapper.find(leftSideWrapperElements.userSettings).exists()).toBeTruthy();
    expect(wrapper.find(leftSideWrapperElements.userFriends).exists()).toBeTruthy();
    expect(wrapper.find(leftSideWrapperElements.topSide).exists()).toBeTruthy();
    expect(wrapper.find(leftSideWrapperElements.userList).exists()).toBeTruthy();
  });
});
