import { axiosWithAuth } from '@/api';

const URL_AUTH = '/panels';

export const panelsService = {
    async getPanelsById(id) {
        return await axiosWithAuth.get(`${URL_AUTH}/${id}`);
    },
    async getPanelsStatistic(id) {
        return await axiosWithAuth.get(`${URL_AUTH}/statistics/${id}`);
    },
    async getPanelById(id) {
        return await axiosWithAuth.get(`${URL_AUTH}/panel/${id}`);
    }
};
