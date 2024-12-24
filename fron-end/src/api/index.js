import axios from 'axios';
import { getAccessToken, saveAccessTokenStorage } from '@/utils/cookies';

const options = {
    baseURL: 'http://localhost:7000'
};

export const axiosClassic = axios.create(options);

export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
    const authToken = getAccessToken();

    if (config?.headers && authToken) config.headers.Authorization = `Bearer ${authToken}`;

    return config;
});

axiosWithAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post('/api/auth/refresh');

                saveAccessTokenStorage(data.accessToken)

                axiosWithAuth.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                return axiosWithAuth(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
