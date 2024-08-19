import axios from "axios";
import { parseCookies, setCookie as createCookie, destroyCookie } from "nookies";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getCookie('refreshToken'); // Retrieve refresh token from cookies
                const response = await api.post('/auth/refresh-token', { refreshToken });

                // Update cookies with new tokens
                const { token, refreshToken: newRefreshToken } = response.data;
                setCookie('token', token); // Update cookie with new token
                setCookie('refreshToken', newRefreshToken); // Update cookie with new refresh token

                // Retry original request with new token
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh error:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const getCookie = (key: string)=>{
    const cookie = parseCookies()
    return cookie[key];
}

export const setCookie = (key: string, value: string, ctx?: any) => {
    createCookie(ctx, key, value, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
    });
};

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

