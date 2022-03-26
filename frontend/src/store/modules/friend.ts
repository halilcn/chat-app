import axios from 'axios';

import { Commit, Dispatch } from 'vuex';

interface CustomObject {
    [key: string]: any;
}

export default {
    state: {
        enableFriends: false
    },
    mutations: {
        toggleFriends(state: CustomObject): void {
            state.enableFriends = !state.enableFriends;
        }
    },
    actions: {},
    namespaced: true
};
