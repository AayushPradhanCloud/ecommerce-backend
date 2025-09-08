import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useCategories } from '@/entities/category/api';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
export const Categories = () => {
    const { data: categories, isLoading } = useCategories();
    if (isLoading) {
        return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx(LoadingSpinner, { size: "lg" }) }) }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-8", children: "All Categories" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: categories?.map((category) => (_jsx(Link, { to: `/products?category=${category.slug}`, className: "block group", children: _jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105", children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: category.name }), _jsx("p", { className: "text-gray-600 text-sm", children: category.description }), _jsx("div", { className: "mt-4 text-primary-600 font-medium text-sm", children: "Browse products \u2192" })] }) }) }, category.id))) })] }));
};
//# sourceMappingURL=index.js.map