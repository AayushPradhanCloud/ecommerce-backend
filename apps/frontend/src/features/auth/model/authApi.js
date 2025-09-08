import api from '~/shared/lib/api';
import { User } from '~/shared/types/db';
export const login = async (dto) => {
    const { data } = await api.post('/auth/login', dto);
    return data;
};
export const getMe = async () => {
    const { data } = await api.get('/auth/me');
    return data;
};
//# sourceMappingURL=authApi.js.map