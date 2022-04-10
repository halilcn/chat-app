import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    enableFriends: false,
    friendsList: [],
    searchFriendList: []
  },
  mutations: {
    toggleFriends(state: CustomObject) {
      state.enableFriends = !state.enableFriends;
    },
    setFriends(state: CustomObject, payload: Array<object>) {
      state.friendsList = payload;
    }
  },
  actions: {
    async getFriends({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/friends')).data;
      commit('setFriends', data);
    }
  },
  namespaced: true
};
