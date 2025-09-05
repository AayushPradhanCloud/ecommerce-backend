import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderHandler } from 'src/modules/orders/commands/handlers/create-order.handler';
import { GetOrdersHandler } from 'src/modules/orders/queries/handlers/get-orders.handler';
import { GetOrderByIdHandler } from 'src/modules/orders/queries/handlers/handlers/get-order-by-id.handler';
import { OrdersRepository } from 'src/modules/orders/repositories/orders.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

const QueryHandlers = [GetOrdersHandler, GetOrderByIdHandler];
const CommandHandlers = [CreateOrderHandler];

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [OrdersService,
    OrdersRepository,
    ...CommandHandlers,
    ...QueryHandlers
  ],
})
export class OrdersModule { }
