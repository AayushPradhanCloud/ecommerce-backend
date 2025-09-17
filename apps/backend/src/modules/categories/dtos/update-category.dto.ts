import { createZodDto } from '@anatine/zod-nestjs';
import { createCategorySchema } from './create-category.dto';

export const updateCategorySchema = createCategorySchema.partial();

export class UpdateCategoryDto extends createZodDto(updateCategorySchema) { }
