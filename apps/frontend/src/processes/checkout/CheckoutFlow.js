import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useCartStore } from '@/features/cart';
import { useAuthStore } from '@/features/auth';
import { orderApi } from '@/entities/order/api';
import { OrderStatus } from '@/entities/order/types';
import { AddressStep } from './steps/AddressStep';
import { PaymentStep } from './steps/PaymentStep';
import { ReviewStep } from './steps/ReviewStep';
export const CheckoutFlow = () => {
    const [currentStep, setCurrentStep] = useState('address');
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useAuthStore();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const handleNext = () => {
        if (currentStep === 'address')
            setCurrentStep('payment');
        else if (currentStep === 'payment')
            setCurrentStep('review');
    };
    const handleBack = () => {
        if (currentStep === 'payment')
            setCurrentStep('address');
        else if (currentStep === 'review')
            setCurrentStep('payment');
    };
    const handleCompleteOrder = async () => {
        setIsProcessing(true);
        try {
            // Create order
            await orderApi.createOrder({
                userId: user?.id || 0,
                totalPrice: getTotalPrice(),
                status: OrderStatus.PENDING,
                items: items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            });
            // Clear cart
            clearCart();
            // Show success message or redirect
            alert('Order placed successfully!');
        }
        catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        }
        finally {
            setIsProcessing(false);
        }
    };
    const steps = [
        { id: 'address', title: 'Shipping Address' },
        { id: 'payment', title: 'Payment Method' },
        { id: 'review', title: 'Review Order' }
    ];
    return (_jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("div", { className: "mb-8", children: _jsx("nav", { "aria-label": "Progress", children: _jsx("ol", { className: "flex items-center", children: steps.map((step, index) => (_jsxs("li", { className: `relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`, children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${steps.findIndex(s => s.id === currentStep) > index
                                                ? 'bg-primary-600'
                                                : steps.findIndex(s => s.id === currentStep) === index
                                                    ? 'border-2 border-primary-600'
                                                    : 'border-2 border-gray-300'}`, children: steps.findIndex(s => s.id === currentStep) > index ? (_jsx("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })) : (_jsx("span", { className: `h-2 w-2 rounded-full ${steps.findIndex(s => s.id === currentStep) === index
                                                    ? 'bg-primary-600'
                                                    : 'bg-gray-300'}` })) }), _jsx("div", { className: "ml-3 text-sm font-medium text-gray-900 hidden sm:block", children: step.title })] }), index !== steps.length - 1 && (_jsx("div", { className: "absolute top-4 left-8 -ml-px w-full h-0.5 bg-gray-300" }))] }, step.id))) }) }) }), _jsxs("div", { className: "bg-white shadow-md rounded-lg p-6", children: [currentStep === 'address' && _jsx(AddressStep, {}), currentStep === 'payment' && _jsx(PaymentStep, {}), currentStep === 'review' && _jsx(ReviewStep, {}), _jsxs("div", { className: "flex justify-between mt-8", children: [_jsx(Button, { variant: "outline", onClick: handleBack, disabled: currentStep === 'address', children: "Back" }), currentStep === 'review' ? (_jsx(Button, { onClick: handleCompleteOrder, isLoading: isProcessing, children: "Complete Order" })) : (_jsxs(Button, { onClick: handleNext, children: ["Continue to ", currentStep === 'address' ? 'Payment' : 'Review'] }))] })] })] }));
};
//# sourceMappingURL=CheckoutFlow.js.map