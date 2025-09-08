import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ProductList, ProductFilter, useProducts } from '@/features/products';
import { ProductFilters } from '@/entities/product/types';
export const Products = () => {
    const [filters, setFilters] = useState({});
    const { data: products, isLoading } = useProducts(filters);
    return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsx("div", { className: "w-full md:w-1/4", children: _jsx(ProductFilter, { onFilter: setFilters, isLoading: isLoading }) }), _jsxs("div", { className: "w-full md:w-3/4", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Products" }), _jsxs("div", { className: "text-sm text-gray-500", children: [products?.length || 0, " products found"] })] }), _jsx(ProductList, { products: products || [], isLoading: isLoading })] })] }) }));
};
//# sourceMappingURL=index.js.map