import { axiosClassic } from '@/api';
import { removeFromStorage, saveAccessTokenStorage } from '@/utils/cookies';

const URL_AUTH = '/auth';

export const authService = {
    async login(data) {
        const response = await axiosClassic.post(`${URL_AUTH}/login`, data);

        if (response?.data?.accessToken) saveAccessTokenStorage(response?.data?.token);

        return response;
    },

    async logout() {
        removeFromStorage();
    }
};