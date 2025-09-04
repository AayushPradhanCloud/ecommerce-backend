import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../delete-category.command';
import { CategoriesRepository } from '../../repositories/categories.repository';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
  constructor(private readonly repo: CategoriesRepository) {}
  execute({ id }: DeleteCategoryCommand) {
    return this.repo.delete(id);
  }
}
