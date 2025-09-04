import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../delete-product.command';
import { ProductsService } from '../../services/products.service';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly service: ProductsService) {}
  execute({ id }: DeleteProductCommand) {
    return this.service.delete(id);
  }
}
