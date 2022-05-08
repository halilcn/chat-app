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
    updateUser(state: CustomObject, payload: object) {
      const newUser = { ...state.user, ...payload };
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(newUser));
      state.user = newUser;
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
      const { data } = (await axios.post('/user-action/login', payload)).data;
      const { token } = data;

      const user = await dispatch('getUserInfo', token);
      commit('setUser', { ...user, token });
      window.location.reload();
    },
    async postLogout({ commit }: { commit: Commit }): Promise<void> {
      await axios.post('/user-action/logout');
      commit('removeUser');
    },
    async getUserInfo(_: any, payload: string): Promise<object> {
      const { data } = (await axios.get('/user-settings/', { headers: { Authorization: payload } })).data;

      return data.user;
    }
  },
  namespaced: true
};
