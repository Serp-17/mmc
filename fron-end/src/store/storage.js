import { storageService } from '@/services/StorageService';

export default {
    namespaced: true,
    state: () => ({
        storage: [],
        item: null
    }),
    mutations: {
        setStorage(state, storage) {
            state.storage = storage;
        },
        addItem(state, item) {
            state.storage.push(item);
        },
        setItem(state, item) {
            state.item = item;
        }
    },
    actions: {
        async fetchStorage({ commit }) {
            try {
                const res = await storageService.getAllStore();
                commit('setStorage', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setStorage', []);
            }
        },
        async addItem({ commit }, newItem) {
            try {
                const res = await storageService.addNewItem(newItem);
                commit('addItem', res.data);
            } catch (err) {
                console.error('Error adding new item:', err);
                throw err;
            }
        },
        async fetchItemById({ commit }, id) {
            try {
                const res = await storageService.getItemById(id);
                commit('setItem', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setItem', null);
            }
        }
    },
    getters: {
        getStorage(state) {
            return state.storage;
        },
        getItem(state) {
            return state.item;
        }
    }
};
