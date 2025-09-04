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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RolesGuard } from '../common/guards/roles.guard';
import { AdminOnly, AdminOrManager } from '../common/decorators/roles.decorators';
import { CreateProductCommand } from '../modules/products/commands/create-product.command';
import { UpdateProductCommand } from '../modules/products/commands/update-product.command';
import { DeleteProductCommand } from '../modules/products/commands/delete-product.command';
import { CreateProductDto, createProductSchema } from '../modules/products/dtos/create-product.dto';
import { UpdateProductDto, updateProductSchema } from '../modules/products/dtos/update-product.dto';
import { GetProductByIdQuery } from '../modules/products/queries/get-product-by-id.query';
import { GetProductsQuery } from '../modules/products/queries/get-products.query';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@UseGuards(RolesGuard)
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

  @AdminOrManager()
  @Post()
  async create(@Body(new ZodValidationPipe(createProductSchema)) dto: CreateProductDto) {
    return this.commands.execute(new CreateProductCommand(dto));
  }

  @AdminOrManager()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateProductSchema)) dto: UpdateProductDto,
  ) {
    return this.commands.execute(new UpdateProductCommand(id, dto));
  }

  @AdminOnly()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commands.execute(new DeleteProductCommand(id));
  }
}
