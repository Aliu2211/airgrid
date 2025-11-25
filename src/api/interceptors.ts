import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {apiClient} from './client';
import {getToken, removeToken} from '../services/storageService';

/**
 * Request interceptor to add authentication token
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor to handle common errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      await removeToken();
      // You can add navigation to login screen here
    }
    return Promise.reject(error);
  },
);

export default apiClient;
