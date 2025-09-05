import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from '../get-categories.query';
import { CategoriesRepository } from '../../repositories/categories.repository';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(private readonly repo: CategoriesRepository) {}
  execute() {
    return this.repo.findAll();
  }
}
