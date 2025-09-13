import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductsRepository } from '../../repositories/products.repository';
import { CreateProductCommand } from '../create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly repository: ProductsRepository) { }

  async execute(command: CreateProductCommand) {
    return this.repository.create(command.dto);
  }
}
