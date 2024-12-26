import { axiosWithAuth } from '@/api';

const URL_AUTH = '/storage';

export const storageService = {
    async getAllStore() {
        return await axiosWithAuth.get(`${URL_AUTH}/stock`);
    },

    async addNewItem(newItem) {
        return await axiosWithAuth.post(`${URL_AUTH}/add`, newItem);
    },

    async getItemById(id) {
        return await axiosWithAuth.get(`${URL_AUTH}/item/${id}`);
    }
};
