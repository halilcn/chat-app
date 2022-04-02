import axios from 'axios';

import { Commit, Dispatch } from 'vuex';
import File from '@/store/modules/file';

interface CustomObject {
  [key: string]: any | File;
}

export default {
  state: {
    enableUserSettings: false
  },
  mutations: {
    toggleUserSettings(state: CustomObject): void {
      state.enableUserSettings = !state.enableUserSettings;
    }
  },
  actions: {
    async postUserSettings({ dispatch, commit }: { dispatch: Dispatch; commit: Commit }, payload: CustomObject) {
      if (typeof payload.image == 'object') {
        payload.image = await dispatch(
          'file/postImage',
          {
            image: payload.image
          },
          { root: true }
        );
      }

      await axios.put('/user-settings', payload);

      commit('auth/updateUser', payload, { root: true });
    }
  },
  namespaced: true
};
