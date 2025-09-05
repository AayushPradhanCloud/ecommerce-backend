import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/create-product.command';
import { UpdateProductCommand } from '../commands/update-product.command';
import { DeleteProductCommand } from '../commands/delete-product.command';
import { GetProductsQuery } from '../queries/get-products.query';
import { GetProductByIdQuery } from '../queries/get-product-by-id.query';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
};

@Injectable()
export class ProductsService {
  constructor(private readonly commands: CommandBus, private readonly queries: QueryBus) {}

  async findAll(categoryId?: number): Promise<Product[]> {
    return this.queries.execute(new GetProductsQuery(categoryId));
  }

  async findOne(id: number): Promise<Product> {
    return this.queries.execute(new GetProductByIdQuery(id));
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.commands.execute(new CreateProductCommand(dto));
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    return this.commands.execute(new UpdateProductCommand(id, dto));
  }

  async remove(id: number): Promise<Product> {
    return this.commands.execute(new DeleteProductCommand(id));
  }
}
