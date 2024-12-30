import { axiosWithAuth } from '@/api';

const URL_AUTH = '/stations';

export const stationsService = {
    async getStation(id_panel, station) {
        return await axiosWithAuth.get(`${URL_AUTH}/stock`, {
            id_panel,
            station
        });
    },
    async postStation(id_panel, station, data) {
        console.log(id_panel, station, data)
        // return await axiosWithAuth.post(`${URL_AUTH}/`);
    }
};
