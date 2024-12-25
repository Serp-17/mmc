import { storageService } from '@/services/StorageService';

export default {
    namespaced: true,
    state: () => ({
        storage: []
    }),
    mutations: {
        setStorage(state, storage) {
            state.storage = storage;
        },
        addItem(state, item) {
            state.storage.push(item);
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
            console.log('------------')
            console.log(newItem)
            console.log('------------')
            try {
                const res = await storageService.addNewItem(newItem);
                commit('addItem', res.data);
            } catch (err) {
                console.error('Error adding new item:', err);
                throw err;
            }
        }
    },
    getters: {
        getStorage(state) {
            return state.storage;
        }
    }
};
