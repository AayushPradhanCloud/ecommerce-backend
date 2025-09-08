import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { ProductFilters } from '@/entities/product/types'

interface ProductFilterProps {
  onFilter: (filters: ProductFilters) => void
  isLoading?: boolean
}

export const ProductFilter = ({ onFilter, isLoading }: ProductFilterProps) => {
  const [filters, setFilters] = useState<ProductFilters>({})
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [search, setSearch] = useState('')

  const handleApplyFilters = () => {
    const newFilters: ProductFilters = {}
    
    if (minPrice) newFilters.minPrice = Number(minPrice)
    if (maxPrice) newFilters.maxPrice = Number(maxPrice)
    if (search) newFilters.search = search
    
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleClearFilters = () => {
    setMinPrice('')
    setMaxPrice('')
    setSearch('')
    setFilters({})
    onFilter({})
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      
      <div className="space-y-4">
        <Input
          label="Search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Min Price"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            label="Max Price"
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={handleApplyFilters}
            isLoading={isLoading}
            className="flex-1"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}