import { axiosWithAuth } from '@/api';

const URL_AUTH = '/transactions';

export const transactionsService = {
    async getTransactionsByItemId(id) {
        return await axiosWithAuth.get(`${URL_AUTH}/item/${id}`);
    }
};
