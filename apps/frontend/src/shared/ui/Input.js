import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/formatters';
export const Input = forwardRef(({ className, error, label, id, ...props }, ref) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1", children: label })), _jsx("input", { ref: ref, id: id, className: cn('w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500', error && 'border-red-500 focus:ring-red-500 focus:border-red-500', className), ...props }), error && _jsx("p", { className: "mt-1 text-sm text-red-600", children: error })] }));
});
Input.displayName = 'Input';
//# sourceMappingURL=Input.js.map