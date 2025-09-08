import { Button } from '@/shared/ui/Button'
import { useCartStore } from '../model/cartStore'
import { formatPrice } from '@/shared/utils/formatters'

interface CartItemProps {
  item: {
    product: {
      id: number
      name: string
      price: number
      image?: string
    }
    quantity: number
  }
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore()
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product.id)
    } else {
      updateQuantity(item.product.id, newQuantity)
    }
  }

  return (
    <div className="flex items-center hover:bg-gray-50 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24 w-20 object-cover rounded-md"
            src={item.product.image || 'https://via.placeholder.com/80'}
            alt={item.product.name}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.product.name}</span>
          <button
            onClick={() => removeItem(item.product.id)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs text-left"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
        >
          -
        </button>
        <input
          type="number"
          className="mx-2 border text-center w-12 h-8"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          min="1"
        />
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
        >
          +
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        {formatPrice(item.product.price)}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        {formatPrice(item.product.price * item.quantity)}
      </span>
    </div>
  )
}