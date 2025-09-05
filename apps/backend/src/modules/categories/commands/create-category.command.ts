import { CreateCategoryDto } from '../dtos/create-category.dto';
export class CreateCategoryCommand {
  constructor(public readonly dto: CreateCategoryDto) {}
}
