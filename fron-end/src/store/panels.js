import { panelsService } from '@/services/PanelsService';

export default {
    namespaced: true,
    state: () => ({
        panels: [],
        in_progress_panels: [],
        panels_statistic: null,
        panel: null
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
        },
        setPanel(state, panel) {
            state.panel = panel;
        }
    },
    actions: {
        async fetchPanels({ commit }, id) {
            try {
                const res = await panelsService.getPanelsById(id);
                commit('setPanels', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setPanels', []);
            }
        },
        async fetchInProgressPanels({ commit }, id) {
            try {
                const res = await panelsService.getPanelsById(id);
                commit(
                    'setInProgressPanels',
                    res.data.filter((item) => item.status === 'in progress')
                );
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
        },
        async fetchPanelById({ commit }, id) {
            try {
                const res = await panelsService.getPanelById(id);
                commit('setPanel', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setPanel', null);
            }
        },
        async putPanel({ commit }, { id, data }) {
            try {
                const res = await panelsService.putPanel(id, data);
                commit('setPanel', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setPanel', null);
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
        },
        getPanel(state) {
            return state.panel;
        }
    }
};
