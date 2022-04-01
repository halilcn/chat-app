import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
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
    async postUserSettings(_: any, payload: object) {
      console.log(payload);
      alert('post user settings');
    }
  },
  namespaced: true
};
