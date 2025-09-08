import api from '~/shared/lib/api';
import { User } from '~/shared/types/db';

export interface LoginDto { email: string; password: string }
export interface LoginRes { user: User; token?: string }

export const login = async (dto: LoginDto): Promise<LoginRes> => {
  const { data } = await api.post('/auth/login', dto);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/auth/me');
  return data;
};
