import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Product } from '@/entities/product/types';
import { ProductCard } from '@/widgets/ProductCard';
export const ProductList = ({ products, isLoading }) => {
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [...Array(8)].map((_, i) => (_jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-gray-200 h-48 rounded-md mb-4" }), _jsx("div", { className: "bg-gray-200 h-4 rounded-md mb-2" }), _jsx("div", { className: "bg-gray-200 h-4 w-2/3 rounded-md" })] }, i))) }));
    }
    if (products.length === 0) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "No products found" }), _jsx("p", { className: "mt-1 text-gray-500", children: "Try adjusting your search filters" })] }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map((product) => (_jsx(ProductCard, { product: product }, product.id))) }));
};
//# sourceMappingURL=ProductList.js.map