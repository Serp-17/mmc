import { axiosWithAuth } from '@/api';

const URL_AUTH = '/stations';

export const stationsService = {
    async getStation(id_panel, station, data) {
        return await axiosWithAuth.get(`${URL_AUTH}/${id_panel}`, data);
    },
    async postStation(id_panel, station, data) {
        return await axiosWithAuth.post(`${URL_AUTH}/${id_panel}?station_name=${station}`, data);
    },
    async getStationByIdAndName(id_panel, station) {
        return await axiosWithAuth.get(`${URL_AUTH}/station/${id_panel}/${station}`);
    }
};
