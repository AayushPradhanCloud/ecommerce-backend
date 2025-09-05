import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryByIdQuery } from '../get-category-by-id.query';
import { CategoriesRepository } from '../../repositories/categories.repository';

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdHandler implements IQueryHandler<GetCategoryByIdQuery> {
  constructor(private readonly repo: CategoriesRepository) {}

  async execute(query: GetCategoryByIdQuery) {
    const category = await this.repo.findById(query.id);
    if (!category) {
      throw new Error(`Category with ID ${query.id} not found`);
    }
    return category;
  }
}
