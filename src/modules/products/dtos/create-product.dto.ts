import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Name must be a string' } as any)
    .nonempty('Name is required')
    .max(191, 'Name cannot exceed 191 characters'),

  slug: z
    .string({ invalid_type_error: 'Slug must be a string' } as any)
    .nonempty('Slug is required')
    .max(191, 'Slug cannot exceed 191 characters'),

  description: z
    .string({ invalid_type_error: 'Description must be a string' } as any)
    .max(191, 'Description cannot exceed 191 characters')
    .optional(),

  price: z
    .number({ invalid_type_error: 'Price must be a number' } as any)
    .positive('Price must be positive'),

  stock: z
    .number({ invalid_type_error: 'Stock must be a number' } as any)
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),

  categoryId: z
    .number({ invalid_type_error: 'Category ID must be a number' } as any)
    .int('Category ID must be an integer'),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}
