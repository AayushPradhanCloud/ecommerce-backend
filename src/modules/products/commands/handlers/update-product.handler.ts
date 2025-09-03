import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../update-product.command';
import { ProductsService } from '../../services/products.service';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(private readonly service: ProductsService) {}
  execute({ id, dto }: UpdateProductCommand) {
    return this.service.update(id, dto);
  }
}
