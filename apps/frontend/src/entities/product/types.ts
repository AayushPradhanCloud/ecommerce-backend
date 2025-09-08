export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  categoryId: number
  image?: string
}

export interface ProductFilters {
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  search?: string
}