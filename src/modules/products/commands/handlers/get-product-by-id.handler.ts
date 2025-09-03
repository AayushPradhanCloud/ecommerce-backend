import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdQuery } from '../../queries/get-product-by-id.query';
import { ProductsService } from '../../services/products.service';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery> {
  constructor(private readonly service: ProductsService) {}
  execute({ id }: GetProductByIdQuery) {
    return this.service.findById(id);
  }
}
