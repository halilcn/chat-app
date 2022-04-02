import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {},
  mutations: {},
  actions: {
    async postImage(_: any, payload: CustomObject): Promise<string> {
      const form = new FormData();
      form.append('image', payload.image);

      const { data } = (
        await axios.post('/image', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      ).data;

      return data.path;
    }
  },
  namespaced: true
};