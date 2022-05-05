import axios from 'axios';
import { Commit } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    enableFriends: false,
    friendsList: [],
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
    setUserList(state: CustomObject, payload: Array<any>) {
      payload = payload.map((friendUser: any) => {
        if (friendUser.isFriend) friendUser.friendId = state.friendsList.find((friend: any) => friend.user._id == friendUser._id).friendId;

        friendUser.user = {
          _id: friendUser._id,
          username: friendUser.username,
          image: friendUser.image
        };

        return friendUser;
      });

      state.userList = payload;
    },
    cleanSearchFriendList(state: CustomObject) {
      state.searchFriendList = [];
    },
    copyFriendsListToUserList(state: CustomObject) {
      state.userList = state.friendsList;
    },
    removeFriend(state: CustomObject, payload: string) {
      state.friendsList = state.friendsList.filter((friend: any) => friend.friendId != payload);
    }
  },
  actions: {
    async getFriends({ commit }: { commit: Commit }) {
      const { data } = (await axios.get('/friends')).data;
      commit('setFriends', data);
      commit('copyFriendsListToUserList');
    },
    async getFriend(_: any, payload: string) {
      alert(payload);
      const test = (await axios.get('/friends')).data;
      return test;
    },
    async postFriend(_: any, payload: string) {
      await axios.post('/friends', { recipient: payload });
    },
    async searchFriend({ commit }: { commit: Commit }, payload: string) {
      const { data } = (await axios.get(`/friends/search?value=${payload}`)).data;
      commit('setUserList', data.users);
    },
    async deleteFriend({ commit }: { commit: Commit }, payload: string) {
      await axios.delete(`/friends/${payload}`);
      commit('removeFriend', payload);
      commit('copyFriendsListToUserList');
    }
  },
  namespaced: true
};
