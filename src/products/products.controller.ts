import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Roles } from '../common/guards/roles.guard';
import { CreateProductDto } from '../modules/products/dtos/create-product.dto';
import { UpdateProductDto } from '../modules/products/dtos/update-product.dto';
import { CreateProductCommand } from '../modules/products/commands/create-product.command';
import { UpdateProductCommand } from '../modules/products/commands/update-product.command';
import { DeleteProductCommand } from '../modules/products/commands/delete-product.command';
import { GetProductsQuery } from '../modules/products/queries/get-products.query';
import { GetProductByIdQuery } from '../modules/products/queries/get-product-by-id.query';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commands: CommandBus,
    private readonly queries: QueryBus,
  ) {}

  @Get()
  async list(@Query('categoryId') categoryId?: string) {
    const cid = categoryId ? Number(categoryId) : undefined;
    return this.queries.execute(new GetProductsQuery(cid));
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.queries.execute(new GetProductByIdQuery(id));
  }

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.commands.execute(new CreateProductCommand(dto));
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.commands.execute(new UpdateProductCommand(id, dto));
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commands.execute(new DeleteProductCommand(id));
  }
}
