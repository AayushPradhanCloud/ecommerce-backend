import { User } from './types';
export declare const mockUsers: User[];
export declare const userApi: {
    getUsers: () => Promise<User[]>;
    getUser: (id: number) => Promise<User | null>;
    updateUser: (id: number, updates: Partial<User>) => Promise<User>;
    deleteUser: (id: number) => Promise<void>;
};
export declare const useUsers: () => import("@tanstack/react-query").UseQueryResult<User[], Error>;
export declare const useUser: (id: number) => import("@tanstack/react-query").UseQueryResult<User | null, Error>;
//# sourceMappingURL=api.d.ts.map