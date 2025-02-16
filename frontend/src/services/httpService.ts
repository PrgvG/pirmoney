import { authService } from './authService';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const initAxiosInstance = (baseUrl: string) => {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
    });

    axiosInstance.interceptors.request.use(async (config) => {
        const token = authService.getToken();

        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    });

    return axiosInstance;
};

class HttpService {
    private httpInstance;

    constructor(httpInstance: AxiosInstance) {
        this.httpInstance = httpInstance;
    }

    async get<T>(
        endpoint: string,
        options: AxiosRequestConfig = {},
    ): Promise<T> {
        try {
            const response = await this.httpInstance.get<T>(endpoint, options);

            return response.data;
        } catch (error) {
            throw this.getErrorData(error);
        }
    }

    async post<T>(
        endpoint: string,
        data: unknown,
        options: AxiosRequestConfig = {},
    ): Promise<T> {
        try {
            const response = await this.httpInstance.post<T>(
                endpoint,
                data,
                options,
            );

            return response.data;
        } catch (error) {
            throw this.getErrorData(error);
        }
    }

    async delete<T>(
        endpoint: string,
        options: AxiosRequestConfig = {},
    ): Promise<T> {
        try {
            const response = await this.httpInstance.delete<T>(
                endpoint,
                options,
            );

            return response.data;
        } catch (error) {
            throw this.getErrorData(error);
        }
    }

    async put<T>(
        endpoint: string,
        data?: unknown,
        options?: AxiosRequestConfig,
    ): Promise<T> {
        try {
            const response = await this.httpInstance.put<T>(
                endpoint,
                data,
                options,
            );

            return response.data;
        } catch (error) {
            throw this.getErrorData(error);
        }
    }

    async patch<T>(
        endpoint: string,
        data: unknown,
        options: AxiosRequestConfig = {},
    ): Promise<T> {
        try {
            const response = await this.httpInstance.patch<T>(
                endpoint,
                data,
                options,
            );

            return response.data;
        } catch (error) {
            throw this.getErrorData(error);
        }
    }

    getErrorData = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }

        return error;
    };
}

export const httpService = new HttpService(
    initAxiosInstance(import.meta.env.VITE_SERVER),
);
