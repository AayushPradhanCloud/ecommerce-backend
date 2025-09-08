import { Button } from '@/shared/ui/Button'
import { useCartStore } from '../model/cartStore'
import { formatPrice } from '@/shared/utils/formatters'
import { Link } from 'react-router-dom'

interface CartSummaryProps {
  onCheckout?: () => void
  showCheckoutButton?: boolean
}

export const CartSummary = ({ onCheckout, showCheckoutButton = true }: CartSummaryProps) => {
  const { getTotalPrice, getTotalItems, items } = useCartStore()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
        <p className="text-gray-600">Your cart is empty</p>
        <Link to="/products">
          <Button className="w-full mt-4">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
      
      <div className="flex justify-between mb-2">
        <span>Items ({totalItems})</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span className="text-green-600">Free</span>
      </div>
      
      <div className="flex justify-between mb-2">
        <span>Tax</span>
        <span>{formatPrice(totalPrice * 0.1)}</span>
      </div>
      
      <hr className="my-4" />
      
      <div className="flex justify-between mb-6">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">{formatPrice(totalPrice * 1.1)}</span>
      </div>
      
      {showCheckoutButton && (
        <Button className="w-full" onClick={onCheckout}>
          Checkout
        </Button>
      )}
      
      <Link to="/products">
        <Button variant="outline" className="w-full mt-2">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}