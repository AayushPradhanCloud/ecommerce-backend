import axios from "axios";
import { useAuthStore } from "../../shared/store/auth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { refreshToken, user } = useAuthStore.getState();
                if (!refreshToken) throw new Error("No refresh token available");

                const response = await axios.post("http://localhost:3000/api/auth/refresh", {
                    userId: user?.id,
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefresh, user: newUser } =
                    response.data;

                useAuthStore.getState().setTokens(accessToken, newRefresh, newUser);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                useAuthStore.getState().logout();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
