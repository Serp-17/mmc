import { removeFromStorage, getAccessToken, saveAccessTokenStorage } from '@/utils/cookies';

export default {
    namespaced: true,
    state: () => ({
        token: getAccessToken(),
        user: null
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            saveAccessTokenStorage(token);
        },
        clearToken(state) {
            state.token = null;
            removeFromStorage();
        }
    },
    actions: {
        setToken({ commit }, userData) {
            commit('setToken', userData);
        },
        logoutUser({ commit }) {
            commit('clearToken');
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token;
        },
        isLoggedIn(state) {
            return !!state.user;
        }
    }
};
