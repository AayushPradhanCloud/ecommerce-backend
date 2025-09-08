import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/formatters';
export const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
        outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 disabled:border-primary-300 disabled:text-primary-300',
        ghost: 'text-primary-600 hover:bg-primary-50 disabled:text-primary-300'
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };
    return (_jsxs("button", { ref: ref, className: cn(baseClasses, variants[variant], sizes[size], className), disabled: disabled || isLoading, ...props, children: [isLoading && (_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })), children] }));
});
Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map