import { create } from "zustand";

export type User = {
  id: string;
  name?: string;
  email: string;
  role?: string;
  [key: string]: unknown;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, accessToken: string, refreshToken?: string | null) => void;
  logout: () => void;
  setTokens: (
    accessToken: string | null,
    refreshToken?: string | null,
    user?: User | null
  ) => void;
  hydrateFromStorage: () => void;
};

const LOCAL_STORAGE_KEY = "auth_state";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  login: (user, accessToken, refreshToken = null) => {
    const newState = { user, accessToken, refreshToken };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch (err) {
      console.error("Failed to save auth state:", err);
    }
    set(newState);
  },

  logout: () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to remove auth state:", err);
    }
    set({ user: null, accessToken: null, refreshToken: null });
  },

  setTokens: (accessToken, refreshToken = null, user = null) => {
    const currentUser = user ?? get().user;
    const newState = { user: currentUser, accessToken, refreshToken };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch (err) {
      console.error("Failed to save auth state:", err);
    }
    set(newState);
  },

  hydrateFromStorage: () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        set({
          user: parsed.user ?? null,
          accessToken: parsed.accessToken ?? null,
          refreshToken: parsed.refreshToken ?? null,
        });
      }
    } catch (err) {
      console.warn("Failed to parse auth state from localStorage:", err);
    }
  },
}));

useAuthStore.getState().hydrateFromStorage();
