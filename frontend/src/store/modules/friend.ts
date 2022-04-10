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
    },
    setSearchFriendList(state: CustomObject, payload: any) {
      payload.map((user: any) => {
        if (user.isFriend) {
          user.friendId = state.friendsList.find((friend: any) => friend.user._id == user._id)._id;
        }
      });

      state.searchFriendList = payload;
    },
    cleanSearchFriendList(state: CustomObject) {
      state.searchFriendList = [];
    }
  },
  actions: {
    async getFriends({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/friends')).data;
      commit('setFriends', data);
    },
    async searchFriend({ commit }: { commit: Commit }, payload: string) {
      const { data } = (await axios.get(`/friends/search?value=${payload}`)).data;
      commit('setSearchFriendList', data.users);
    }
  },
  namespaced: true
};
