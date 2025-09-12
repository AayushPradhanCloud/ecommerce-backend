import React from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '../types';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product || {
      name: '',
      slug: '',
      description: '',
      price: '',
      stock: 0,
      categoryId: 0,
    },
  });

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const { data: categoriesData } = useCategories();

  const onSubmit = async (data: any) => {
    try {
      if (product) {
        await updateMutation.mutateAsync({ id: product.id, product: data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />

          <Input
            label="Slug"
            {...register('slug', { required: 'Slug is required' })}
            error={errors.slug?.message}
          />

          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />

          <Input
            label="Price"
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            error={errors.price?.message}
          />

          <Input
            label="Stock"
            type="number"
            {...register('stock', { 
              required: 'Stock is required',
              min: { value: 0, message: 'Stock cannot be negative' }
            })}
            error={errors.stock?.message}
          />

          <Select
            label="Category"
            {...register('categoryId', { 
              required: 'Category is required',
              valueAsNumber: true
            })}
            error={errors.categoryId?.message}
          >
            <option value={0}>Select a category</option>
            {categoriesData?.data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <div className="flex space-x-4 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending}>
              {product ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};