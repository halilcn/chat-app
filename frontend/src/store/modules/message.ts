import axios from 'axios';
import { Commit } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    messages: [],
    messageUser: {},
    userListMessages: [],
    selectedChatFriendId: null,
    selectedUserId: null
  },
  mutations: {
    setSelectedChatFriendId(state: CustomObject, payload: string) {
      state.selectedChatFriendId = payload;
    },
    setSelectedUserId(state: CustomObject, payload: string) {
      state.selectedUserId = payload;
    },
    setUserListMessages(state: CustomObject, payload: Array<object>) {
      state.userListMessages = payload;
    },
    updateUserListMessage(state: CustomObject, payload: CustomObject) {
      const index = state.userListMessages.indexOf((userMessage: CustomObject) => (userMessage.user._id = payload.message.user._id));
      state.userListMessages[index] = payload.message;
    },
    setMessages(state: CustomObject, payload: Array<object>) {
      state.messages = payload;
    },
    clearMessages(state: CustomObject) {
      state.messages = [];
    },
    setMessage(state: CustomObject, payload: object) {
      state.messages.push(payload);
    },
    deleteUserFromUserList(state: CustomObject, payload: string) {
      state.userListMessages = state.userListMessages.filter((user: any) => user.friendId != payload);
    },
    clearUnReadMessagesCountOnUserList(state: CustomObject, friendId: string) {
      state.userListMessages = state.userListMessages = state.userListMessages.map((user: any) => {
        if (user.friendId == friendId) user.unReadMessagesCount = 0;
        return user;
      });
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
    async postMessage({ state }: { state: CustomObject }, payload: object[]) {
      await axios.post(`/friends/${state.selectedChatFriendId}/messages`, { messages: payload });
    },
    async postReadMessage({ state }: { state: CustomObject }, payload: string[]) {
      await axios.post(`/friends/${state.selectedChatFriendId}/messages/read`, { messageIds: payload });
    },
    async deleteAllMessages({ state, commit }: { state: CustomObject; commit: Commit }) {
      await axios.delete(`/friends/${state.selectedChatFriendId}/messages`);

      commit('clearMessages');
    }
  },
  getters: {
    messageLength(state: CustomObject) {
      return state.messages.length;
    }
  },
  namespaced: true
};
