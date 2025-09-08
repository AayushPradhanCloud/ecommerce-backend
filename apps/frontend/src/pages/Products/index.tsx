import { useState } from 'react'
import { ProductList, ProductFilter, useProducts } from '@/features/products'
import { ProductFilters } from '@/entities/product/types'

export const Products = () => {
  const [filters, setFilters] = useState<ProductFilters>({})
  const { data: products, isLoading } = useProducts(filters)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilter onFilter={setFilters} isLoading={isLoading} />
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <div className="text-sm text-gray-500">
              {products?.length || 0} products found
            </div>
          </div>
          
          <ProductList products={products || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}