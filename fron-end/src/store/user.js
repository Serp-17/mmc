import { removeFromStorage, getAccessToken, saveAccessTokenStorage } from '@/utils/cookies';
import { authService } from '@/services/AuthService';

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
        },
        async fetchUser({ commit }) {
            try {
                const res = await authService.fetchUser();
                commit('setUser', res.data);
            } catch (err) {
                console.error('Error fetching user:', err);
                commit('setUser', null);
            }
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
            return !!state.token;
        }
    }
};
