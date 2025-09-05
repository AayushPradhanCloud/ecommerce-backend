import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from '../modules/categories/repositories/categories.repository';
import { CategoriesService } from '../modules/categories/services/categories.service';
import { CreateCategoryHandler } from '../modules/categories/commands/handlers/create-category.handler';
import { UpdateCategoryHandler } from '../modules/categories/commands/handlers/update-category.handler';
import { DeleteCategoryHandler } from '../modules/categories/commands/handlers/delete-category.handler';
import { GetCategoriesHandler } from '../modules/categories/queries/handlers/get-categories.handler';

const QueryHandlers = [GetCategoriesHandler];
const CommandHandlers = [CreateCategoryHandler, UpdateCategoryHandler, DeleteCategoryHandler];

@Module({
  imports: [CqrsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, ...QueryHandlers, ...CommandHandlers],
  exports: [CategoriesService],
})
export class CategoriesModule {}
