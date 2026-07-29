import axios from 'axios';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 30000, // 30 seconds
    withCredentials: true
});

// Request interceptor - Add token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login page
            window.location.href = '/login';
        }
        
        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error('Access denied. You don\'t have permission.');
        }
        
        // Handle 404 Not Found
        if (error.response?.status === 404) {
            console.error('Resource not found.');
        }
        
        // Handle 500 Server Error
        if (error.response?.status >= 500) {
            console.error('Server error. Please try again later.');
        }
        
        return Promise.reject(error);
    }
);

export default api;
