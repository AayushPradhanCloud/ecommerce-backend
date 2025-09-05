import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductsRepository } from '../../repositories/products.repository';
import { GetProductsQuery } from '../get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly repository: ProductsRepository) {}

  async execute(query: GetProductsQuery) {
    return this.repository.findAll(query.categoryId);
  }
}
