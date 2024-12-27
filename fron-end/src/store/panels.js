import { panelsService } from '@/services/PanelsService';

export default {
    namespaced: true,
    state: () => ({
        panels: [],
        in_progress_panels: [],
        panels_statistic: null
    }),
    mutations: {
        setPanels(state, panels) {
            state.panels = panels;
        },
        setInProgressPanels(state, panels) {
            state.in_progress_panels = panels;
        },
        setPanelsStatistic(state, statistic) {
            state.panels_statistic = statistic;
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
        },
        async fetchInProgressPanels({ commit }, id) {
            try {
                const res = await panelsService.getInProgressPanels(id);
                commit('setInProgressPanels', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setInProgressPanels', []);
            }
        },
        async fetchPanelsStatistic({ commit }, id) {
            try {
                const res = await panelsService.getPanelsStatistic(id);
                commit('setPanelsStatistic', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setPanelsStatistic', []);
            }
        }
    },
    getters: {
        getPanels(state) {
            return state.panels;
        },
        getInProgressPanels(state) {
            return state.in_progress_panels;
        },
        getPanelsStatistic(state) {
            return state.panels_statistic;
        }
    }
};
