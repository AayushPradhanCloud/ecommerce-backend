import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: productData, isLoading } = useProduct(slug || '');
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!productData?.data) {
    return <div className="text-center py-12">Product not found.</div>;
  }

  const product = productData.data;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.image || '/api/placeholder/400/400'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mt-2">
              ${parseFloat(product.price).toFixed(2)}
            </p>
          </div>

          {product.description && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{product.stock} available</span>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};