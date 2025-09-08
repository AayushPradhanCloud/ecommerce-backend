import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/shared/ui/Button';
import { useCartStore } from '../model/cartStore';
import { formatPrice } from '@/shared/utils/formatters';
export const CartItem = ({ item }) => {
    const { updateQuantity, removeItem } = useCartStore();
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(item.product.id);
        }
        else {
            updateQuantity(item.product.id, newQuantity);
        }
    };
    return (_jsxs("div", { className: "flex items-center hover:bg-gray-50 -mx-8 px-6 py-5", children: [_jsxs("div", { className: "flex w-2/5", children: [_jsx("div", { className: "w-20", children: _jsx("img", { className: "h-24 w-20 object-cover rounded-md", src: item.product.image || 'https://via.placeholder.com/80', alt: item.product.name }) }), _jsxs("div", { className: "flex flex-col justify-between ml-4 flex-grow", children: [_jsx("span", { className: "font-bold text-sm", children: item.product.name }), _jsx("button", { onClick: () => removeItem(item.product.id), className: "font-semibold hover:text-red-500 text-gray-500 text-xs text-left", children: "Remove" })] })] }), _jsxs("div", { className: "flex justify-center w-1/5", children: [_jsx("button", { onClick: () => handleQuantityChange(item.quantity - 1), className: "w-8 h-8 flex items-center justify-center rounded-full bg-gray-200", children: "-" }), _jsx("input", { type: "number", className: "mx-2 border text-center w-12 h-8", value: item.quantity, onChange: (e) => handleQuantityChange(Number(e.target.value)), min: "1" }), _jsx("button", { onClick: () => handleQuantityChange(item.quantity + 1), className: "w-8 h-8 flex items-center justify-center rounded-full bg-gray-200", children: "+" })] }), _jsx("span", { className: "text-center w-1/5 font-semibold text-sm", children: formatPrice(item.product.price) }), _jsx("span", { className: "text-center w-1/5 font-semibold text-sm", children: formatPrice(item.product.price * item.quantity) })] }));
};
//# sourceMappingURL=CartItem.js.map