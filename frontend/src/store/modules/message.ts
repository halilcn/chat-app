import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    messages: [],
    userListMessages: [],
    selectedChatFriendId: null
  },
  mutations: {
    setSelectedChatFriendId(state: CustomObject, payload: string) {
      state.selectedChatFriendId = payload;
    },
    setUserListMessages(state: CustomObject, payload: Array<object>) {
      state.userListMessages = payload;
    }
  },
  actions: {
    async getUserListMessages({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/user-messages')).data;
      commit('setUserListMessages', data.messages);
    }
  },
  getters: {},
  namespaced: true
};
