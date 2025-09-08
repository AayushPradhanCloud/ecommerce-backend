import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { LoggerModule } from './common/logger/logger.module';
import { DatabaseService } from './database/service/database.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CategoriesModule, OrdersModule, LoggerModule, OpenaiModule, ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
