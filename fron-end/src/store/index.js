import { createStore } from 'vuex';
import user from './user';
import storage from './storage';
import transactions from './transactions';
import panels from './panels';

const store = createStore({
    modules: {
        user,
        storage,
        transactions,
        panels
    }
});

export default store;
