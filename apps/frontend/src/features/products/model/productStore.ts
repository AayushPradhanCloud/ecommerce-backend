import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '~/shared/types/db';
import * as authApi from './productApi';

type AuthState = {
  user: User | null;
  token?: string | null;
  loading: boolean;
  error?: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User | null) => void;
  hasRole: (roles: Role | Role[]) => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      setUser: (u) => set({ user: u }),
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.login({ email, password });
          set({ user: res.user, token: res.token ?? null, loading: false });
        } catch (err: any) {
          set({ error: err?.response?.data?.message ?? err.message, loading: false });
          throw err;
        }
      },
      logout: () => {
        set({ user: null, token: null });
      },
      hasRole: (roles) => {
        const u = get().user;
        if (!u) return false;
        if (Array.isArray(roles)) return roles.includes(u.role);
        return u.role === roles;
      }
    }),
    { name: 'auth-storage' }
  )
);
