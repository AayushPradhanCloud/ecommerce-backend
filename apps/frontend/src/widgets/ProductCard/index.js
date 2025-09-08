import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Product } from '@/entities/product/types';
import { useCartStore } from '@/features/cart';
import { formatPrice } from '@/shared/utils/formatters';
export const ProductCard = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1);
    };
    return (_jsxs("div", { className: "group", children: [_jsxs(Link, { to: `/products/${product.id}`, className: "block", children: [_jsx("div", { className: "aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200", children: _jsx("img", { src: product.image || 'https://via.placeholder.com/300', alt: product.name, className: "h-full w-full object-cover object-center group-hover:opacity-75" }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm text-gray-700", children: product.name }), _jsx("p", { className: "mt-1 text-lg font-medium text-gray-900", children: formatPrice(product.price) })] })] }), _jsx("div", { className: "mt-4", children: _jsx(Button, { onClick: handleAddToCart, disabled: product.stock === 0, className: "w-full", children: product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }) })] }));
};
//# sourceMappingURL=index.js.map