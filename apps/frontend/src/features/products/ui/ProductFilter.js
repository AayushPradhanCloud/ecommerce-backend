import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ProductFilters } from '@/entities/product/types';
export const ProductFilter = ({ onFilter, isLoading }) => {
    const [filters, setFilters] = useState({});
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState('');
    const handleApplyFilters = () => {
        const newFilters = {};
        if (minPrice)
            newFilters.minPrice = Number(minPrice);
        if (maxPrice)
            newFilters.maxPrice = Number(maxPrice);
        if (search)
            newFilters.search = search;
        setFilters(newFilters);
        onFilter(newFilters);
    };
    const handleClearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
        setFilters({});
        onFilter({});
    };
    return (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Filters" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Search", placeholder: "Search products...", value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { label: "Min Price", type: "number", placeholder: "0", value: minPrice, onChange: (e) => setMinPrice(e.target.value) }), _jsx(Input, { label: "Max Price", type: "number", placeholder: "1000", value: maxPrice, onChange: (e) => setMaxPrice(e.target.value) })] }), _jsxs("div", { className: "flex space-x-2 pt-2", children: [_jsx(Button, { onClick: handleApplyFilters, isLoading: isLoading, className: "flex-1", children: "Apply Filters" }), _jsx(Button, { variant: "outline", onClick: handleClearFilters, className: "flex-1", children: "Clear" })] })] })] }));
};
//# sourceMappingURL=ProductFilter.js.map