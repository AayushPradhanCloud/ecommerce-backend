import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RolesGuard } from '../common/guards/roles.guard';
import { AdminOnly, AdminOrManager } from '../common/decorators/roles.decorators';
import { CreateCategoryCommand } from '../modules/categories/commands/create-category.command';
import { UpdateCategoryCommand } from '../modules/categories/commands/update-category.command';
import { DeleteCategoryCommand } from '../modules/categories/commands/delete-category.command';
import { CreateCategoryDto, createCategorySchema } from '../modules/categories/dtos/create-category.dto';
import { UpdateCategoryDto, updateCategorySchema } from '../modules/categories/dtos/update-category.dto';
import { GetCategoriesQuery } from '../modules/categories/queries/get-categories.query';
import { GetCategoryByIdQuery } from '../modules/categories/queries/get-category-by-id.query';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

@UseGuards(RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly commands: CommandBus,
    private readonly queries: QueryBus,
  ) {}

  @Get()
  async list(): Promise<Category[]> {
    return this.queries.execute(new GetCategoriesQuery());
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.queries.execute(new GetCategoryByIdQuery(id));
  }

  @AdminOrManager()
  @Post()
  async create(
    @Body(new ZodValidationPipe(createCategorySchema)) dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.commands.execute(new CreateCategoryCommand(dto));
  }

  @AdminOrManager()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCategorySchema)) dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.commands.execute(new UpdateCategoryCommand(id, dto));
  }

  @AdminOnly()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.commands.execute(new DeleteCategoryCommand(id));
  }
}
