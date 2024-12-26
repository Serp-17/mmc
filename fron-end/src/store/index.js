import { createStore } from 'vuex';
import user from './user';
import storage from './storage';
import transactions from './transactions';

const store = createStore({
    modules: {
        user,
        storage,
        transactions
    }
});

export default store;
