import { panelsService } from '@/services/PanelsService';

export default {
    namespaced: true,
    state: () => ({
        panels: []
    }),
    mutations: {
        setPanels(state, panels) {
            state.panels = panels;
        }
    },
    actions: {
        async fetchPanels({ commit }, id) {
            try {
                const res = await panelsService.getPanels(id);
                commit('setPanels', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setPanels', []);
            }
        }
    },
    getters: {
        getPanels(state) {
            return state.panels;
        }
    }
};
