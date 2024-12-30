import { axiosWithAuth } from '@/api';

const URL_AUTH = '/stations';

export const stationsService = {
    async getStation(id_panel, station, data) {
        return await axiosWithAuth.get(`${URL_AUTH}/${id_panel}`, data);
    },
    async postStation(id_panel, station, data) {
        console.log(id_panel, station, data)
        // return await axiosWithAuth.post(`${URL_AUTH}/`);
    }
};
