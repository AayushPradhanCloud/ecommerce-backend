import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { useProduct } from '@/features/products';
import { useCartStore } from '@/features/cart';
import { formatPrice } from '@/shared/utils/formatters';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
export const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useProduct(Number(id));
    const addItem = useCartStore((state) => state.addItem);
    if (isLoading) {
        return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx(LoadingSpinner, { size: "lg" }) }) }));
    }
    if (!product) {
        return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Product not found" }), _jsx(Link, { to: "/products", children: _jsx(Button, { children: "Back to Products" }) })] }) }));
    }
    const handleAddToCart = () => {
        addItem(product, 1);
    };
    return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsx("div", { children: _jsx("img", { src: product.image || 'https://via.placeholder.com/400', alt: product.name, className: "w-full h-96 object-cover rounded-lg" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: product.name }), _jsx("p", { className: "text-2xl font-semibold text-primary-600 mb-4", children: formatPrice(product.price) }), _jsx("div", { className: "mb-6", children: _jsx("p", { className: "text-gray-600", children: product.description }) }), _jsx("div", { className: "mb-6", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 0
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'}`, children: product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }) }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { onClick: handleAddToCart, disabled: product.stock === 0, children: "Add to Cart" }), _jsx(Link, { to: "/products", children: _jsx(Button, { variant: "outline", children: "Continue Shopping" }) })] })] })] }) }));
};
//# sourceMappingURL=index.js.map