import { createStore } from 'vuex';
import user from './user';
import storage from './storage';
import transactions from './transactions';
import panels from './panels';
import stations from './stations';
import volumes from './volumes';

const store = createStore({
    modules: {
        user,
        storage,
        transactions,
        panels,
        stations,
        volumes
    }
});

export default store;
