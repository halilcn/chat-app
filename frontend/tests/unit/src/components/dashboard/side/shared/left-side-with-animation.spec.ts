import { VueWrapper } from '@vue/test-utils';

import store from '@/store';
import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation.vue';
import fakeUser, { IUser } from '../../../../../test-utils/fake-user';
import renderComponent from '../../../../../test-utils/render-component';
import fakeSocket from '../../../../../test-utils/fake-socket';
import leftSideWithAnimation from '../../../../../../elements/left-side-with-animation-elements';
import leftSideWithAnimationElement from '../../../../../../elements/left-side-with-animation-elements';

describe('LeftSideWithAnimation', function () {
  let wrapper: VueWrapper;
  let user: IUser;

  const refreshComponent = async (props: object, slots: object = { default: '' }) => {
    const createdFakeUser = await fakeUser();
    user = createdFakeUser.user;

    store.commit('auth/setUser', user);

    wrapper = renderComponent(LeftSideWithAnimation, {
      global: {
        plugins: [store],
        mocks: {
          $socket: fakeSocket()
        }
      },
      props,
      slots
    });
  };

  it('should render component without crashing', async () => {
    await refreshComponent({
      enable: true,
      toggle: jest.fn(),
      title: 'test title'
    });

    expect(wrapper).toBeTruthy();
  });

  describe('side container', () => {
    it('should be enable when enable prop is true', async () => {
      await refreshComponent({
        enable: true,
        toggle: jest.fn(),
        title: 'test'
      });

      expect(wrapper.find(leftSideWithAnimation.leftSideContainer).exists()).toBeTruthy();
    });

    it('should not be enable when enable prop is false', async () => {
      await refreshComponent({
        enable: false,
        toggle: jest.fn(),
        title: 'test'
      });

      expect(wrapper.find(leftSideWithAnimation.leftSideContainer).exists()).not.toBeTruthy();
    });
  });

  it('toggle prop should be called when click toggle button', async () => {
    const toggle = jest.fn();

    await refreshComponent({
      toggle,
      enable: true,
      title: 'test'
    });

    await wrapper.find(leftSideWithAnimationElement.leftSideToggleButton).trigger('click');

    expect(toggle).toHaveBeenCalled();
  });

  it('content should be contain content of slot', async () => {
    const testContent = 'test content';

    await refreshComponent(
      {
        enable: true,
        toggle: jest.fn(),
        title: 'test'
      },
      {
        default: testContent
      }
    );

    expect(wrapper.find(leftSideWithAnimation.content).text()).toContain(testContent);
  });
});
