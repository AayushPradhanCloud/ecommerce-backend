import { UpdateCategoryDto } from '../dtos/update-category.dto';
export class UpdateCategoryCommand {
  constructor(
    public readonly id: number,
    public readonly dto: UpdateCategoryDto,
  ) {}
}
