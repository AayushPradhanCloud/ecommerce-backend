import { UserRole } from '@/entities/user/types';
import { ReactNode } from 'react';
interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
}
export declare const ProtectedRoute: ({ children, allowedRoles }: ProtectedRouteProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProtectedRoute.d.ts.map