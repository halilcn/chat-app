import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

const LOCAL_STORAGE_USER = 'user';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {
    user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER) as string) ?? null
  },
  mutations: {
    setUser(state: CustomObject, payload: object): void {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(payload));
      state.user = payload;
    },
    removeUser(state: CustomObject): void {
      localStorage.removeItem(LOCAL_STORAGE_USER);
      state.user = null;
    }
  },
  actions: {
    async postRegister({ dispatch }: { dispatch: Dispatch }, payload: CustomObject): Promise<void> {
      await axios.post('/user-action/register', payload);
      const { username, password } = payload;
      await dispatch('postLogin', { username, password });
    },
    async postLogin({ commit, dispatch }: { commit: Commit; dispatch: Dispatch }, payload: object): Promise<void> {
      await axios.post('/user-action/login', payload);
      console.log('okey');
      // await window.location.reload();
      //  commit('setUser', data);
      //  await dispatch('updateUserLanguage', helpers.getLanguage());
      //  await window.location.reload();
    }
  },
  namespaced: true
};
