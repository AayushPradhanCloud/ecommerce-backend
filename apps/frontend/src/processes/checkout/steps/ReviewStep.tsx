import { useCartStore } from '@/features/cart'
import { CartItem, CartSummary } from '@/features/cart'
import { formatPrice } from '@/shared/utils/formatters'

export const ReviewStep = () => {
  const { items, getTotalPrice } = useCartStore()
  const totalPrice = getTotalPrice()

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Review Your Order</h2>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-md font-medium text-gray-900">Order Items</h3>
      </div>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={item.product.image || 'https://via.placeholder.com/60'}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-gray-900">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Tax</span>
          <span>{formatPrice(totalPrice * 0.1)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-900 mt-2">
          <span>Total</span>
          <span>{formatPrice(totalPrice * 1.1)}</span>
        </div>
      </div>
    </div>
  )
}