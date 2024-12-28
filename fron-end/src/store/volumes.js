import { volumesService } from '@/services/VolumesService';

export default {
    namespaced: true,
    state: () => ({
        volumes: []
    }),
    mutations: {
        setVolumes(state, volumes) {
            state.volumes = volumes;
        },
        addVolume(state, volume) {
            state.volumes.push(volume);
        }
    },
    actions: {
        async fetchVolumes({ commit }) {
            try {
                const res = await volumesService.getVolumes();
                commit('setVolumes', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setVolumes', []);
            }
        },
        async addNewVolume({ commit }, { name, link }) {
            try {
                const res = await volumesService.addNewVolume(name, link);
                commit('addVolume', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
            }
        },
    },
    getters: {
        getVolumes(state) {
            return state.volumes;
        }
    }
};
