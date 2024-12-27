import { axiosWithAuth } from '@/api';

const URL_AUTH = '/panels';

export const panelsService = {
    async getPanels(id) {
        // return await axiosWithAuth.get(`${URL_AUTH}/${id}`);
        return await PanelsTest.getPanels();
    }
};

const PanelsTest = {
    getData() {
        return [
            {
                id: 1,
                name: 'EP0340',
                tracking_number: 'RO8322',
                date_completed: '2024-07-09',
                date_shipped: '2024-09-04',
                comment: 'Win small',
                status: 'in progress'
            },
            {
                id: 2,
                name: 'EP0340',
                tracking_number: 'RO8323',
                date_completed: '2024-07-10',
                date_shipped: '2024-09-04',
                comment: 'Win small',
                status: 'done'
            },
            {
                id: 3,
                name: 'EP0340',
                tracking_number: 'RO8324',
                date_completed: '2024-07-16',
                date_shipped: '2024-09-04',
                comment: 'Win small',
                status: 'done'
            },
            {
                id: 4,
                name: 'EP0343',
                tracking_number: 'RO8325',
                date_completed: '2024-07-08',
                date_shipped: '2024-09-04',
                comment: 'Win on site',
                status: 'done'
            },
            {
                id: 5,
                name: 'EP0343',
                tracking_number: 'RO8326',
                date_completed: '2024-07-09',
                date_shipped: '2024-09-04',
                comment: 'Win on site',
                status: 'done'
            },
            {
                id: 6,
                name: 'EP0343',
                tracking_number: 'RO8327',
                date_completed: '2024-07-17',
                date_shipped: '2024-09-04',
                comment: 'Win on site',
                status: 'done'
            },
            {
                id: 7,
                name: 'EP0344',
                tracking_number: 'RO8328',
                date_completed: '2024-07-19',
                date_shipped: '2024-09-04',
                comment: 'Win on site',
                status: 'qa'
            },
            {
                id: 8,
                name: 'EP0345',
                tracking_number: 'RO8329',
                date_completed: '2024-07-17',
                date_shipped: '2024-09-04',
                comment: 'Win big',
                status: 'qa'
            },
            {
                id: 9,
                name: 'EP0346',
                tracking_number: 'RO8330',
                date_completed: '2024-07-31',
                date_shipped: '2024-09-04',
                comment: 'Win on site',
                status: 'qa'
            },
            {
                id: 10,
                name: 'EP0347',
                tracking_number: 'RO8331',
                date_completed: '2024-07-31',
                date_shipped: '2024-09-04',
                comment: 'Win on site',
                status: 'qa'
            },
            {
                id: 11,
                name: 'EP0348',
                tracking_number: 'RO8333',
                date_completed: '2024-07-31',
                date_shipped: '2024-09-04',
                comment: 'Plain',
                status: 'qa'
            },
            {
                id: 12,
                name: 'PW0181',
                tracking_number: 'RO8334',
                date_completed: '2024-07-08',
                date_shipped: '2024-09-04',
                comment: null,
                status: 'in progress'
            },
            {
                id: 13,
                name: 'PW0182',
                tracking_number: 'RO8335',
                date_completed: '2024-07-09',
                date_shipped: '2024-09-04',
                comment: null,
                status: 'in progress'
            },
            {
                id: 14,
                name: 'PW0181',
                tracking_number: 'RO8336',
                date_completed: '2024-07-31',
                date_shipped: '2024-09-04',
                comment: null,
                status: 'in progress'
            },
            {
                id: 15,
                name: 'PW0182',
                tracking_number: 'RO8337',
                date_completed: '2024-07-10',
                date_shipped: '2024-09-04',
                comment: null,
                status: 'in progress'
            },
            {
                id: 16,
                name: 'PW0183',
                tracking_number: 'RO8332',
                date_completed: '2024-07-09',
                date_shipped: '2024-09-04',
                comment: null,
                status: 'in progress'
            },
            {
                id: 17,
                name: 'PW0184',
                tracking_number: 'RO8338',
                date_completed: '2024-07-16',
                date_shipped: '2024-09-04',
                comment: null,
                status: 'in progress'
            },
            {
                id: 18,
                name: 'PW0185',
                tracking_number: 'RO8339',
                date_completed: '2024-07-30',
                date_shipped: '2024-09-04',
                comment: null,
                status: null
            },
            {
                id: 19,
                name: 'PW0186',
                tracking_number: 'RO8340',
                date_completed: '2024-07-16',
                date_shipped: '2024-09-04',
                comment: null,
                status: null
            },
            {
                id: 20,
                name: 'PW0187',
                tracking_number: 'RO8341',
                date_completed: '2024-07-18',
                date_shipped: '2024-09-04',
                comment: null,
                status: null
            }
        ];
    },
    getPanels() {
        return Promise.resolve({data: this.getData()});
    }
};
