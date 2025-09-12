import React from 'react';
import { Product } from '../types';
import { Button } from './ui/Button';
import { PencilIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-200">
        <img
          src={product.image || '/api/placeholder/300/300'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
        <p className="text-blue-600 font-bold text-xl mb-2">
          ${parseFloat(product.price).toFixed(2)}
        </p>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
          
          <div className="flex space-x-2">
            {showActions ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit?.(product)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete?.(product.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};