import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { useCartStore } from '@/features/cart';
import { CartItem, CartSummary } from '@/features/cart';
import { useAuthStore } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
export const Cart = () => {
    const { items } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };
    if (items.length === 0) {
        return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Your cart is empty" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Add some products to your cart to continue shopping" }), _jsx(Link, { to: "/products", children: _jsx(Button, { children: "Continue Shopping" }) })] }) }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-8", children: "Shopping Cart" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs("div", { className: "bg-white rounded-lg shadow-md", children: [_jsxs("div", { className: "hidden md:flex items-center justify-between border-b p-6", children: [_jsx("div", { className: "w-2/5", children: _jsx("span", { className: "text-sm font-semibold", children: "Product" }) }), _jsx("div", { className: "w-1/5 text-center", children: _jsx("span", { className: "text-sm font-semibold", children: "Quantity" }) }), _jsx("div", { className: "w-1/5 text-center", children: _jsx("span", { className: "text-sm font-semibold", children: "Price" }) }), _jsx("div", { className: "w-1/5 text-center", children: _jsx("span", { className: "text-sm font-semibold", children: "Total" }) })] }), items.map((item) => (_jsx(CartItem, { item: item }, item.product.id)))] }) }), _jsx("div", { children: _jsx(CartSummary, { onCheckout: handleCheckout }) })] })] }));
};
//# sourceMappingURL=index.js.map