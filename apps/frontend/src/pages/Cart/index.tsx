import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { useCartStore } from '@/features/cart'
import { CartItem, CartSummary } from '@/features/cart'
import { useAuthStore } from '@/features/auth'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
  const { items } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart to continue shopping</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="hidden md:flex items-center justify-between border-b p-6">
              <div className="w-2/5">
                <span className="text-sm font-semibold">Product</span>
              </div>
              <div className="w-1/5 text-center">
                <span className="text-sm font-semibold">Quantity</span>
              </div>
              <div className="w-1/5 text-center">
                <span className="text-sm font-semibold">Price</span>
              </div>
              <div className="w-1/5 text-center">
                <span className="text-sm font-semibold">Total</span>
              </div>
            </div>
            
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>
        
        <div>
          <CartSummary onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  )
}