import { Task } from "@/typescript/TodoTypes";
import axios from "axios";
import { parseCookies, setCookie as createCookie, destroyCookie } from "nookies";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    withCredentials: true
});

// Request interceptor to attach token to headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling 401 errors and refreshing token
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                // If there's no refresh token, redirect to login
                if (!refreshToken) {
                    window.location.href = '/login';
                    return;
                }

                const refreshResponse = await api.post('/auth/refresh-token', { refreshToken });

                const { token, refreshToken: newRefreshToken } = refreshResponse.data;

                // Update tokens in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Retry the original failed request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token expired or invalid:', refreshError);
                window.location.href = '/login';  // Redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const removeCookie = (key: string, ctx?: any) => {
    destroyCookie(ctx, key);
};

export const createUser = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { username, password });
        return response.data; // Handle response if needed
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            throw new Error(`Error occurred while registering: ${error.response?.data || error.message}`);
        } else {
            // Handle generic error
            throw new Error(`Error occurred while registering: ${String(error)}`);
        }
    }
};

export const userLogin = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        console.log('response is :::::::: \n', response);
        const { token, refreshToken } = response.data
        localStorage.setItem('token',token);
        localStorage.setItem('refreshToken',refreshToken);
        return response.data; // Handle response if needed
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            throw new Error(`Error occurred while logging in: ${error.response?.data || error.message}`);
        } else {
            // Handle generic error
            throw new Error(`Error occurred while logging in: ${String(error)}`);
        }
    }
};

export const usernameChecker = async(username: string)=>{
    try {
        const response = await api.post('/auth/check-username', {username});
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)){
            throw new Error(`Error occurred while checking username: ${error.response?.data || error.message}`);
        } else {
            throw new Error(`Error occurred while checking username: ${String(error)}`);
        }
    }
}

export const requestNewTokens = async (refreshToken: string) => {
    try {
        const response = await api.post('/auth/refresh-token', { refreshToken });
        return response.data; // Handle response if needed
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            throw new Error(`Error occurred while refreshing token: ${error.response?.data || error.message}`);
        } else {
            // Handle generic error
            throw new Error(`Error occurred while refreshing token: ${String(error)}`);
        }
    }
};

export const createTask = async (taskData: Task)=>{
    try {
        const response = await api.post('/task/create-task',{taskData})
        return response.data
    } catch (error) {
        throw new Error(`Error occurred while creating task: ${error}`)
    }
};

