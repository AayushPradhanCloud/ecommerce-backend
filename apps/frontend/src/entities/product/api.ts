import { useQuery } from '@tanstack/react-query'
import { Product, ProductFilters } from './types'

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    slug: 'classic-white-tshirt',
    description: 'A comfortable and versatile white t-shirt made from 100% cotton.',
    price: 24.99,
    stock: 50,
    categoryId: 1,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Black Denim Jacket',
    slug: 'black-denim-jacket',
    description: 'A stylish black denim jacket perfect for casual outings.',
    price: 89.99,
    stock: 25,
    categoryId: 1,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description: 'A beautiful floral dress perfect for summer days.',
    price: 59.99,
    stock: 30,
    categoryId: 2,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Comfortable running shoes with excellent support.',
    price: 79.99,
    stock: 40,
    categoryId: 3,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Leather Handbag',
    slug: 'leather-handbag',
    description: 'Elegant leather handbag with multiple compartments.',
    price: 129.99,
    stock: 15,
    categoryId: 4,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Kids Winter Jacket',
    slug: 'kids-winter-jacket',
    description: 'Warm and cozy winter jacket for kids.',
    price: 49.99,
    stock: 35,
    categoryId: 5,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  }
]

// Mock API functions
export const productApi = {
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredProducts = [...mockProducts]
    
    if (filters?.categoryId) {
      filteredProducts = filteredProducts.filter(
        product => product.categoryId === filters.categoryId
      )
    }
    
    if (filters?.minPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= filters.minPrice!
      )
    }
    
    if (filters?.maxPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= filters.maxPrice!
      )
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      )
    }
    
    return filteredProducts
  },

  getProduct: async (id: number): Promise<Product | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return mockProducts.find(product => product.id === id) || null
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return mockProducts.slice(0, 4)
  }
}

// React Query hooks
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getProducts(filters),
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
  })
}

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: productApi.getFeaturedProducts,
  })
}