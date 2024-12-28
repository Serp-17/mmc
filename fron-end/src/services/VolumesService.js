import { axiosWithAuth } from '@/api';

const URL_AUTH = '/volumes';

export const volumesService = {
    async getVolumes() {
        return await axiosWithAuth.get(`${URL_AUTH}/`);
    },

    async addNewVolume(name, link) {
        return await axiosWithAuth.post(`${URL_AUTH}/`, {
            name: name,
            link: link
        });
    }
};
