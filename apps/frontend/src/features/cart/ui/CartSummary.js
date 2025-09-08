import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/shared/ui/Button';
import { useCartStore } from '../model/cartStore';
import { formatPrice } from '@/shared/utils/formatters';
import { Link } from 'react-router-dom';
export const CartSummary = ({ onCheckout, showCheckoutButton = true }) => {
    const { getTotalPrice, getTotalItems, items } = useCartStore();
    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();
    if (items.length === 0) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Cart Summary" }), _jsx("p", { className: "text-gray-600", children: "Your cart is empty" }), _jsx(Link, { to: "/products", children: _jsx(Button, { className: "w-full mt-4", children: "Continue Shopping" }) })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Cart Summary" }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsxs("span", { children: ["Items (", totalItems, ")"] }), _jsx("span", { children: formatPrice(totalPrice) })] }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { children: "Shipping" }), _jsx("span", { className: "text-green-600", children: "Free" })] }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { children: "Tax" }), _jsx("span", { children: formatPrice(totalPrice * 0.1) })] }), _jsx("hr", { className: "my-4" }), _jsxs("div", { className: "flex justify-between mb-6", children: [_jsx("span", { className: "font-semibold", children: "Total" }), _jsx("span", { className: "font-semibold", children: formatPrice(totalPrice * 1.1) })] }), showCheckoutButton && (_jsx(Button, { className: "w-full", onClick: onCheckout, children: "Checkout" })), _jsx(Link, { to: "/products", children: _jsx(Button, { variant: "outline", className: "w-full mt-2", children: "Continue Shopping" }) })] }));
};
//# sourceMappingURL=CartSummary.js.map