import { stationsService } from '@/services/StationsService';

export default {
    namespaced: true,
    state: () => ({
        stations: null
    }),
    mutations: {
        setStation(state, data) {
            state.station = data;
        }
    },
    actions: {
        async fetchStation({ commit }, data) {
            try {
                const res = await stationsService.getStation(data.id_panel, data.station);
                commit('setStation', res.data);
            } catch (err) {
                console.error('Error station storage:', err);
                commit('setStation', null);
            }
        },
        async postStation({ commit }, { id_panel, station, data }) {
            try {
                const res = await stationsService.postStation(id_panel, station, data);
                commit('setStation', res.data);
            } catch (err) {
                console.error('Error station storage:', err);
                commit('setStation', null);
            }
        }
    },
    getters: {
        getStation(state) {
            return state.stations;
        }
    }
};
