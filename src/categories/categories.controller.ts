import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Roles } from '../common/guards/roles.guard';
import { CreateCategoryDto } from '../modules/categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '../modules/categories/dtos/update-category.dto';
import { CreateCategoryCommand } from '../modules/categories/commands/create-category.command';
import { UpdateCategoryCommand } from '../modules/categories/commands/update-category.command';
import { DeleteCategoryCommand } from '../modules/categories/commands/delete-category.command';
import { GetCategoriesQuery } from '../modules/categories/queries/get-categories.query';

type Category = {
  id: number;
  name: string;
};

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly commands: CommandBus,
    private readonly queries: QueryBus,
  ) {}

  @Get()
  async list(): Promise<Category[]> {
    return await this.queries.execute(new GetCategoriesQuery());
  }

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return await this.commands.execute(new CreateCategoryCommand(dto));
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.commands.execute(new UpdateCategoryCommand(id, dto));
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.commands.execute(new DeleteCategoryCommand(id));
  }
}
