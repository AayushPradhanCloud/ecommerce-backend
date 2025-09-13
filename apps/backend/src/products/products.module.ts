import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { CreateProductHandler } from '../modules/products/commands/handlers/create-product.handler';
import { DeleteProductHandler } from '../modules/products/commands/handlers/delete-product.handler';
import { UpdateProductHandler } from '../modules/products/commands/handlers/update-product.handler';
import { GetProductByIdHandler } from '../modules/products/queries/handlers/get-product-by-id.handler';
import { GetProductsHandler } from '../modules/products/queries/handlers/get-products.handler';
import { ProductsRepository } from '../modules/products/repositories/products.repository';
import { ProductsService } from '../modules/products/services/products.service';
import { ProductsController } from './products.controller';

const CommandHandlers = [CreateProductHandler, UpdateProductHandler, DeleteProductHandler];

const QueryHandlers = [GetProductsHandler, GetProductByIdHandler];

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ProductsModule { }
