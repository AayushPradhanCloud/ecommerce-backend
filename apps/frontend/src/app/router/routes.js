import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Categories } from '@/pages/Categories';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { AdminDashboard } from '@/pages/Dashboard/Admin';
import { StaffDashboard } from '@/pages/Dashboard/Staff';
import { CustomerDashboard } from '@/pages/Dashboard/Customer';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/Products/ProductDetail';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRole } from '@/entities/user/types';
export const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/categories", element: _jsx(Categories, {}) }), _jsx(Route, { path: "/products", element: _jsx(Products, {}) }), _jsx(Route, { path: "/products/:id", element: _jsx(ProductDetail, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(ProtectedRoute, { children: _jsx(Checkout, {}) }) }), _jsx(Route, { path: "/admin/*", element: _jsx(ProtectedRoute, { allowedRoles: [UserRole.ADMIN], children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/staff/*", element: _jsx(ProtectedRoute, { allowedRoles: [UserRole.STAFF], children: _jsx(StaffDashboard, {}) }) }), _jsx(Route, { path: "/customer/*", element: _jsx(ProtectedRoute, { allowedRoles: [UserRole.CUSTOMER], children: _jsx(CustomerDashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx("div", { children: "Page not found" }) })] }));
};
//# sourceMappingURL=routes.js.map