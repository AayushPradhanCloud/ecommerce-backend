import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/authStore';
import { UserRole } from '@/entities/user/types';
import { ReactNode } from 'react';
export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
//# sourceMappingURL=ProtectedRoute.js.map