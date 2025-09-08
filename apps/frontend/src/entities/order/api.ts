import { useQuery } from '@tanstack/react-query'
import { Order, OrderStatus } from './types'

// Mock orders data
let mockOrders: Order[] = [
  {
    id: 1,
    userId: 3, // customer user
    totalPrice: 149.97,
    status: OrderStatus.COMPLETED,
    createdAt: '2023-05-15T10:30:00Z',
    items: [
      {
        id: 1,
        orderId: 1,
        productId: 1,
        quantity: 2,
        price: 24.99,
        createdAt: '2023-05-15T10:30:00Z'
      },
      {
        id: 2,
        orderId: 1,
        productId: 4,
        quantity: 1,
        price: 79.99,
        createdAt: '2023-05-15T10:30:00Z'
      }
    ]
  },
  {
    id: 2,
    userId: 3,
    totalPrice: 59.99,
    status: OrderStatus.PENDING,
    createdAt: '2023-06-20T14:45:00Z',
    items: [
      {
        id: 3,
        orderId: 2,
        productId: 3,
        quantity: 1,
        price: 59.99,
        createdAt: '2023-06-20T14:45:00Z'
      }
    ]
  }
]

export const orderApi = {
  getOrders: async (userId?: number): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    if (userId) {
      return mockOrders.filter(order => order.userId === userId)
    }
    
    return mockOrders
  },
  
  getOrder: async (id: number): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockOrders.find(order => order.id === id) || null
  },
  
  createOrder: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newOrder: Order = {
      ...order,
      id: Math.max(...mockOrders.map(o => o.id)) + 1,
      createdAt: new Date().toISOString()
    }
    
    mockOrders.push(newOrder)
    return newOrder
  },
  
  updateOrderStatus: async (id: number, status: OrderStatus): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const orderIndex = mockOrders.findIndex(order => order.id === id)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }
    
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status
    }
    
    return mockOrders[orderIndex]
  },
  
  deleteOrder: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    mockOrders = mockOrders.filter(order => order.id !== id)
  }
}

// React Query hooks
export const useOrders = (userId?: number) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => orderApi.getOrders(userId),
  })
}

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
  })
}