import axios, { InternalAxiosRequestConfig } from 'axios';
import { getReauthFn } from '../context/ReauthContext';

// Extend config to carry a retry flag
interface RetryableConfig extends InternalAxiosRequestConfig {
    _isRetry?: boolean;
}

// Create axios instance with base URL
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3005/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach auth token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 responses: show reauth modal, retry request after re-login
// Handle 403 responses: reject as-is (authorization error, reauth won't help)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status;
        const config = error.config as RetryableConfig | undefined;

        if (status === 401 && config && !config._isRetry) {
            const url = config.url || '';
            // Don't trigger reauth for login/register — let the caller handle 401
            if (url.startsWith('/auth/')) {
                return Promise.reject(error);
            }
            const requestReauth = getReauthFn();
            if (requestReauth) {
                try {
                    await requestReauth();
                    // Token has been refreshed — retry the original request
                    config._isRetry = true;
                    return apiClient(config);
                } catch {
                    // User cancelled reauth — fall through to reject
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
