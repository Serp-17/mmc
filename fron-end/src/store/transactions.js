import { transactionsService } from '@/services/TransactionsService';

export default {
    namespaced: true,
    state: () => ({
        transactions: []
    }),
    mutations: {
        setTransactions(state, transactions) {
            state.transactions = transactions;
        }
    },
    actions: {
        async fetchTransactionsById({ commit }, item_id) {
            try {
                const res = await transactionsService.getTransactionsByItemId(item_id);
                commit('setTransactions', res.data);
            } catch (err) {
                console.error('Error fetching storage:', err);
                commit('setTransactions', []);
            }
        }
    },
    getters: {
        getTransactions(state) {
            return state.transactions;
        }
    }
};
