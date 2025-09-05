import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductsRepository } from '../../repositories/products.repository';
import { GetProductByIdQuery } from '../get-product-by-id.query'; 

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery> {
  constructor(private readonly repository: ProductsRepository) {}

  async execute(query: GetProductByIdQuery) {
    const product = await this.repository.findById(query.id);
    if (!product) throw new Error(`Product with ID ${query.id} not found`);
    return product;
  }
}
