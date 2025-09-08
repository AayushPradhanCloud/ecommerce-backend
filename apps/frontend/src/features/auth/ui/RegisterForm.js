import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useAuthStore } from '../model/authStore';
import { UserRole } from '@/entities/user/types';
export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(UserRole.CUSTOMER);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const register = useAuthStore((state) => state.register);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            const success = await register(email, password, role);
            if (!success) {
                setError('Registration failed. Please try again.');
            }
        }
        catch (err) {
            setError('An error occurred during registration');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Create a new account" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Or", ' ', _jsx(Link, { to: "/login", className: "font-medium text-primary-600 hover:text-primary-500", children: "sign in to your existing account" })] })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md", children: error })), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Email address", id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email" }), _jsx(Input, { label: "Password", id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password" }), _jsx(Input, { label: "Confirm Password", id: "confirmPassword", name: "confirmPassword", type: "password", autoComplete: "new-password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Confirm your password" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Account Type" }), _jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: UserRole.CUSTOMER, children: "Customer" }), _jsx("option", { value: UserRole.STAFF, children: "Staff" }), _jsx("option", { value: UserRole.ADMIN, children: "Admin" })] })] })] }), _jsx("div", { children: _jsx(Button, { type: "submit", className: "w-full", isLoading: isLoading, children: "Create Account" }) })] })] }) }));
};
//# sourceMappingURL=RegisterForm.js.map