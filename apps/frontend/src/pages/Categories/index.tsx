import { Link } from 'react-router-dom'
import { useCategories } from '@/entities/category/api'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'

export const Categories = () => {
  const { data: categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">All Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.slug}`}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
                <div className="mt-4 text-primary-600 font-medium text-sm">
                  Browse products →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}