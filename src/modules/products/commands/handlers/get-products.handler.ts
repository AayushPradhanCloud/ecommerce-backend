import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from '../../queries/get-products.query';
import { ProductsService } from '../../services/products.service';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly service: ProductsService) {}
  execute({ categoryId }: GetProductsQuery) {
    return this.service.findAll(categoryId);
  }
}
