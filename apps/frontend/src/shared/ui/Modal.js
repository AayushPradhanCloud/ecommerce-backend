import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { cn } from '../utils/formatters';
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen)
        return null;
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: [_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", onClick: onClose }), _jsx("div", { className: cn('relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full', sizeClasses[size]), children: _jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold leading-6 text-gray-900", children: title }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "h-8 w-8 p-0", children: _jsx(XMarkIcon, { className: "h-5 w-5" }) })] }), children] }) })] }) }));
};
//# sourceMappingURL=Modal.js.map