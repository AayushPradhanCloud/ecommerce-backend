import { useQuery } from '@tanstack/react-query'
import { User, UserRole } from './types'

// Mock users data
export const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    name: 'Admin User',
    role: UserRole.ADMIN
  },
  {
    id: 2,
    email: 'staff@example.com',
    name: 'Staff User',
    role: UserRole.STAFF
  },
  {
    id: 3,
    email: 'customer@example.com',
    name: 'Customer User',
    role: UserRole.CUSTOMER
  }
]

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockUsers
  },
  
  getUser: async (id: number): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockUsers.find(user => user.id === id) || null
  },
  
  updateUser: async (id: number, updates: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const userIndex = mockUsers.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates
    }
    
    return mockUsers[userIndex]
  },
  
  deleteUser: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const userIndex = mockUsers.findIndex(user => user.id === id)
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1)
    }
  }
}

// React Query hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getUsers(),
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  })
}