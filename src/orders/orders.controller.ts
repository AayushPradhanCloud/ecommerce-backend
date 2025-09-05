import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'src/modules/orders/commands/create-order.command';
import { GetOrderByIdQuery } from 'src/modules/orders/queries/get-order-by-id.query';
import { GetOrdersQuery } from 'src/modules/orders/queries/get-orders.query';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

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

    @Post()
    async createOrder(
        @Body() body: { userId: number; items: { productId: number; quantity: number; price: string }[] }
    ) {
        const { userId, items } = body;
        const orderId = await this.commandBus.execute(new CreateOrderCommand(userId, items));
        return { success: true, orderId };
    }
}
