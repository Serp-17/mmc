import { createStore } from 'vuex';
import user from './user';
import storage from './storage';

const store = createStore({
    modules: {
        user,
        storage
    }
});

export default store;
