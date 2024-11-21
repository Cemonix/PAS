import axios from "axios";
import { store } from '../store';

const apiClient = axios.create({
    baseURL: import.meta.env.VUE_APP_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = store.state.auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await store.dispatch('logout');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
