import axios from "axios";
import type{ AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../shared/store/auth";

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      if (typeof config.headers?.set === "function") {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      } else if (config.headers) {
        (config.headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: InternalAxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (typeof originalRequest.headers?.set === "function") {
                originalRequest.headers.set("Authorization", `Bearer ${token}`);
              } else if (originalRequest.headers) {
                (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
              }
              resolve(client(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) throw new Error("No refresh token available");

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = res.data;

        useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, user);
        processQueue(null, newAccessToken);

        if (typeof originalRequest.headers?.set === "function") {
          originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
        } else if (originalRequest.headers) {
          (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return client(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
