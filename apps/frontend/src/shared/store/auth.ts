import { create } from "zustand";

type User = {
    id: number;
    email: string;
    role: string;
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (user: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    setTokens: (access: string, refresh: string, user: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,

    login: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),

    logout: () =>
        set({ user: null, accessToken: null, refreshToken: null }),

    setTokens: (access, refresh, user) =>
        set({ accessToken: access, refreshToken: refresh, user }),
}));
