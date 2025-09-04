import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { ProductsService } from '../../services/products.service';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly service: ProductsService) {}
  execute({ dto }: CreateProductCommand) {
    return this.service.create(dto);
  }
}
