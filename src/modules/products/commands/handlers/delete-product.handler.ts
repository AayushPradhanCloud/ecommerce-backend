import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../delete-product.command';
import { ProductsRepository } from '../../repositories/products.repository';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly repository: ProductsRepository) {}

  async execute(command: DeleteProductCommand) {
    return this.repository.delete(command.id);
  }
}
