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
  UseGuards
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AdminOnly, AdminOrManager } from '../common/decorators/roles.decorators';
import { CreateProductDto } from '../modules/products/dtos/create-product.dto';
import { UpdateProductDto } from '../modules/products/dtos/update-product.dto';
import { Product, ProductsService } from '../modules/products/services/products.service';

@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async list(@Query('categoryId') categoryId?: string): Promise<Product[]> {
    const cid = categoryId ? Number(categoryId) : undefined;
    return this.productsService.findAll(cid);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @AdminOrManager()
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  @AdminOrManager()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, dto);
  }

  @AdminOnly()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.remove(id);
  }
}
