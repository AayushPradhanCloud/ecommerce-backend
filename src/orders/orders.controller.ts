import { Controller, Get, Param, Request } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from 'src/modules/orders/queries/get-order-by-id.query';
import { GetOrdersQuery } from 'src/modules/orders/queries/get-orders.query';

@Controller('orders')
export class OrdersController {
    constructor(private readonly queryBus: QueryBus) { }

    @Get()
    async getOrders(@Request() req: any) {
        const userId = req.user?.id || 1;
        return this.queryBus.execute(new GetOrdersQuery(userId));
    }

    @Get(':id')
    async getOrderById(@Param('id') id: string, @Request() req: any) {
        const userId = req.user?.id || 1;   //for testing without JWT
        const orderId = parseInt(id, 10);

        return this.queryBus.execute(new GetOrderByIdQuery(userId, orderId));
    }
}
