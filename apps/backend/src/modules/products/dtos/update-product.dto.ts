import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { createProductSchema } from './create-product.dto';

export const updateProductSchema = createProductSchema.partial();

export class UpdateProductDto extends createZodDto(updateProductSchema) {}
