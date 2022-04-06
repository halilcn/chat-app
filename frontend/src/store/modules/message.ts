import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    messages: [],
    selectedUserId: null
  },
  mutations: {
    setSelectedUserId(state: CustomObject, payload: string) {
      state.selectedUserId = payload;
    }
  },
  actions: {},
  getters: {},
  namespaced: true
};
