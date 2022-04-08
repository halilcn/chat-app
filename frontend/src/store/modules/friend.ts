import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    enableFriends: false,
    userList: []
  },
  mutations: {
    toggleFriends(state: CustomObject) {
      state.enableFriends = !state.enableFriends;
    },
    setFriend(state: CustomObject, payload: Array<object> | object) {
      if (!(payload instanceof Array)) payload = [payload];
      state.friendsList = payload;
      //for (const item in payload) state.friendsList.prepend(item);
    }
  },
  actions: {
    async getFriends({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/friends')).data;
      commit('setFriend', data);
    }
  },
  namespaced: true
};
