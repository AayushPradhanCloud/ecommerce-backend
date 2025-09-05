import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../commands/create-category.command';
import { UpdateCategoryCommand } from '../commands/update-category.command';
import { DeleteCategoryCommand } from '../commands/delete-category.command';
import { GetCategoriesQuery } from '../queries/get-categories.query';
import { GetCategoryByIdQuery } from '../queries/get-category-by-id.query';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

@Injectable()
export class CategoriesService {
  constructor(private readonly commands: CommandBus, private readonly queries: QueryBus) {}

  async findAll(): Promise<Category[]> {
    return this.queries.execute(new GetCategoriesQuery());
  }

  async findOne(id: number): Promise<Category> {
    return this.queries.execute(new GetCategoryByIdQuery(id));
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.commands.execute(new CreateCategoryCommand(dto));
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.commands.execute(new UpdateCategoryCommand(id, dto));
  }

  async remove(id: number): Promise<Category> {
    return this.commands.execute(new DeleteCategoryCommand(id));
  }
}
