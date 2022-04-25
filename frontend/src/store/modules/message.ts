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
    },
    deleteUserFromUserList(state: CustomObject, payload: string) {
      state.userListMessages = state.userListMessages.filter((user: any) => user.friendId != payload);
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
    async postMessage({ state }: { state: CustomObject }, payload: object | object[]) {
      if (!Array.isArray(payload)) payload = [payload];

      await axios.post(`/friends/${state.selectedChatFriendId}/messages`, { messages: payload });
    }
  },
  getters: {},
  namespaced: true
};
