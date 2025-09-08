import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/entities/user/types';
// Mock authentication API calls
const mockAuthApi = {
    login: async (email, password) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'admin@example.com' && password === 'admin123') {
                    resolve({
                        id: 1,
                        email,
                        role: UserRole.ADMIN,
                        name: 'Admin User'
                    });
                }
                else if (email === 'staff@example.com' && password === 'staff123') {
                    resolve({
                        id: 2,
                        email,
                        role: UserRole.STAFF,
                        name: 'Staff User'
                    });
                }
                else if (email === 'customer@example.com' && password === 'customer123') {
                    resolve({
                        id: 3,
                        email,
                        role: UserRole.CUSTOMER,
                        name: 'Customer User'
                    });
                }
                else {
                    resolve(null);
                }
            }, 1000);
        });
    },
    register: async (email, password, role) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Math.floor(Math.random() * 1000),
                    email,
                    role,
                    name: email.split('@')[0]
                });
            }, 1000);
        });
    }
};
export const useAuthStore = create()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    login: async (email, password) => {
        const user = await mockAuthApi.login(email, password);
        if (user) {
            set({ user, isAuthenticated: true });
            return true;
        }
        return false;
    },
    register: async (email, password, role) => {
        const user = await mockAuthApi.register(email, password, role);
        if (user) {
            set({ user, isAuthenticated: true });
            return true;
        }
        return false;
    },
    logout: () => {
        set({ user: null, isAuthenticated: false });
    }
}), {
    name: 'auth-storage'
}));
//# sourceMappingURL=authStore.js.map