import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    enableFriends: false,
    friendsList: [],
    searchFriendList: [],
    userList: []
  },
  mutations: {
    toggleFriends(state: CustomObject) {
      state.enableFriends = !state.enableFriends;
    },
    setFriends(state: CustomObject, payload: Array<any>) {
      payload.map((user: any) => {
        user.isFriend = true;
        user.friendId = user._id;

        return user;
      });

      state.friendsList = payload;
    },
    setSearchFriendList(state: CustomObject, payload: Array<any>) {
      payload = payload.map((friend: any) => {
        if (friend.isFriend) {
          friend.friendId = state.friendsList.find((friend: any) => friend.user._id == friend._id).friendId;
        }

        friend.user = {
          username: friend.username,
          image: friend.username
        };

        return friend;
      });

      state.searchFriendList = payload;
    },
    cleanSearchFriendList(state: CustomObject) {
      state.searchFriendList = [];
    },
    copyFriendsListToUserList(state: CustomObject) {
      state.userList = state.friendsList;
    }
  },
  actions: {
    async getFriends({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/friends')).data;
      commit('setFriends', data);
      commit('copyFriendsListToUserList');
    },
    async searchFriend({ commit }: { commit: Commit }, payload: string) {
      const { data } = (await axios.get(`/friends/search?value=${payload}`)).data;
      commit('setSearchFriendList', data.users);
    }
  },
  namespaced: true
};
