import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseService } from './database/service/database.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CategoriesModule, OrdersModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
