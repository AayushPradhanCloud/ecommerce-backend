import React from 'react';
import { useForm } from 'react-hook-form';
import { Category } from '../types';
import { useCreateCategory, useUpdateCategory } from '../hooks/useCategories';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface CategoryFormProps {
  category?: Category;
  onClose: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: category || {
      name: '',
      slug: '',
      description: '',
    },
  });

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const onSubmit = async (data: any) => {
    try {
      if (category) {
        await updateMutation.mutateAsync({ id: category.id, category: data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {category ? 'Edit Category' : 'Add Category'}
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

          <div className="flex space-x-4 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending}>
              {category ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};