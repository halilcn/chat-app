import axios from 'axios';

import { Commit, Dispatch, ActionContext } from 'vuex';

const LOCAL_STORAGE_USER = 'user';

export default {
  state: {
    user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER) as string) ?? null
  },
  mutations: {
    /*
   *  setUser(state, payload) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(payload));
      state.user = payload;
    },
    removeUser(state) {
      localStorage.removeItem(LOCAL_STORAGE_USER);
      state.user = null;
    },*/
  },
  actions: {
    async postRegister({ dispatch }: { dispatch: Dispatch }, payload: { [key: string]: any }) {
      await axios.post('/user-action/register', payload);
      const { username, password } = payload.user;
      await dispatch('postLogin', { username, password });
    },
    async postLogin({ commit, dispatch }: { commit: Commit; dispatch: Dispatch }, payload: object) {
      const { data } = await axios.post('/user-action/login', payload);
      console.log(data);
      //  commit('setUser', data);
      //  await dispatch('updateUserLanguage', helpers.getLanguage());
      //  await window.location.reload();
    }
  },
  namespaced: true
};
