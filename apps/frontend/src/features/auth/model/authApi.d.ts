import { User } from '~/shared/types/db';
export interface LoginDto {
    email: string;
    password: string;
}
export interface LoginRes {
    user: User;
    token?: string;
}
export declare const login: (dto: LoginDto) => Promise<LoginRes>;
export declare const getMe: () => Promise<User>;
//# sourceMappingURL=authApi.d.ts.map