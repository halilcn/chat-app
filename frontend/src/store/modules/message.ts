import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    messages: [],
    messageUser: {},
    userListMessages: [],
    selectedChatFriendId: null
  },
  mutations: {
    setSelectedChatFriendId(state: CustomObject, payload: string) {
      state.selectedChatFriendId = payload;
    },
    setUserListMessages(state: CustomObject, payload: Array<object>) {
      state.userListMessages = payload;
    },
    setMessages(state: CustomObject, payload: Array<object>) {
      state.messages = payload;
    }
  },
  actions: {
    async getUserListMessages({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/user-messages')).data;

      commit('setUserListMessages', data.messages);
    },
    async getMessages({ commit, state }: { commit: Commit; state: CustomObject }) {
      const { data } = (await axios.get(`/friends/${state.selectedChatFriendId}/messages`)).data;

      commit('setMessages', data.messages);
    },
    async postMessage({ commit, state }: { commit: Commit; state: CustomObject }, payload: object) {
      alert()
    }
  },
  getters: {},
  namespaced: true
};
