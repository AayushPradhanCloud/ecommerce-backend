import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../shared/lib/axios";
import { useAuthStore } from "../../shared/store/auth";

type LoginDto = { email: string; password: string };

export const useLogin = () =>
    useMutation({
        mutationFn: async (dto: LoginDto) => {
            const res = await axiosInstance.post("/auth/login", dto);
            return res.data;
        },
        onSuccess: (data) => {
            useAuthStore.getState().login(
                data.user,
                data.accessToken,
                data.refreshToken
            );
        },
    });

export const useLogout = () =>
    useMutation({
        mutationFn: async () => {
            const { user, refreshToken } = useAuthStore.getState();
            if (!user || !refreshToken) return;
            await axiosInstance.post("/auth/logout", {
                userId: user.id,
                refreshToken,
            });
        },
        onSuccess: () => {
            useAuthStore.getState().logout();
        },
    });
