import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../update-product.command';
import { ProductsRepository } from '../../repositories/products.repository';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(private readonly repository: ProductsRepository) {}

  async execute(command: UpdateProductCommand) {
    return this.repository.update(command.id, command.dto);
  }
}
