import axios from 'axios';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import { handleApiError } from '../utils/apiHelpers';
import { getEnv } from '../utils/helpers';

// Get API URL from environment
const API_URL = getEnv('VITE_API_URL', 'http://localhost:5000/api');

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 30000,
    withCredentials: true
});

// Request interceptor - Add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
            window.location.href = '/login';
        }
        return Promise.reject(handleApiError(error));
    }
);

export default api;
