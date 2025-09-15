// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface User {
//   id: number;
//   email: string;
//   role: 'admin' | 'staff' | 'customer';
//   createdAt: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,
      
//       login: async (email: string, password: string) => {
//         // Mock login - replace with actual API call
//         const mockUser = {
//           id: 1,
//           email,
//           role: email === 'admin@example.com' ? 'admin' : 
//                 email === 'staff@example.com' ? 'staff' : 'customer',
//           createdAt: new Date().toISOString(),
//         };
        
//         set({
//           user: mockUser,
//           token: 'mock-token',
//           isAuthenticated: true,
//         });
//       },
      
//       logout: () => {
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         });
//       },
//     }),
//     {
//       name: 'auth-storage',
//     }
//   )
// );