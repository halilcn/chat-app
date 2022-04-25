import axios from 'axios';

interface CustomObject {
  [key: string]: any;
}

export default {
  state: {},
  mutations: {},
  actions: {
    async postFile(_: any, payload: CustomObject): Promise<string> {
      const fileType = payload.file.type.split('/')[0];
      const form = new FormData();

      form.append('file', payload.file);

      const { data } = (
        await axios.post(`/file/${fileType}`, form, {
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
