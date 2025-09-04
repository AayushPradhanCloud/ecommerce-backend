import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '../update-category.command';
import { CategoriesRepository } from '../../repositories/categories.repository';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  constructor(private readonly repo: CategoriesRepository) {}
  execute({ id, dto }: UpdateCategoryCommand) {
    return this.repo.update(id, dto);
  }
}
