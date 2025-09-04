import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { CreateProductHandler } from '../modules/products/commands/handlers/create-product.handler';
import { DeleteProductHandler } from '../modules/products/commands/handlers/delete-product.handler';
import { GetProductByIdHandler } from '../modules/products/commands/handlers/get-product-by-id.handler';
import { GetProductsHandler } from '../modules/products/commands/handlers/get-products.handler';
import { UpdateProductHandler } from '../modules/products/commands/handlers/update-product.handler';
import { ProductsRepository } from '../modules/products/repositories/products.repository';
import { ProductsService } from '../modules/products/services/products.service';
import { ProductsController } from './products.controller';

const QueryHandlers = [GetProductsHandler, GetProductByIdHandler];
const CommandHandlers = [CreateProductHandler, UpdateProductHandler, DeleteProductHandler];

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService, ...QueryHandlers, ...CommandHandlers],
  exports: [],
})
export class ProductsModule { }