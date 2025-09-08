export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  createdAt: string
}

export interface Order {
  id: number
  userId: number
  totalPrice: number
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}

export enum OrderStatus {
  CART = 'cart',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}