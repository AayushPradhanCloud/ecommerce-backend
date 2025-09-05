import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrdersRepository } from '../../repositories/orders.repository';
import { CreateOrderCommand } from '../create-order.command';

@Injectable()
@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
    implements ICommandHandler<CreateOrderCommand> {
    constructor(private readonly ordersRepo: OrdersRepository) { }

    async execute(command: CreateOrderCommand): Promise<number> {
        const { userId, items } = command;

        await this.ordersRepo.deductStock(items);

        let totalPrice = items.reduce(
            (sum, item) => sum + parseFloat(item.price) * item.quantity,
            0,
        ).toFixed(2);

        for (const item of items) {
            const product = await this.ordersRepo.getProductById(item.productId);
            if (!product) throw new Error(`Product ${item.productId} not found`);
            totalPrice =
                (parseFloat(totalPrice) + parseFloat(product.price) * item.quantity).toFixed(2);
        }

        const orderId = await this.ordersRepo.createOrder(userId, items);
        await this.ordersRepo.deductStock(items);
        await this.ordersRepo.addItems(orderId, items);

        return orderId;
    }
}
