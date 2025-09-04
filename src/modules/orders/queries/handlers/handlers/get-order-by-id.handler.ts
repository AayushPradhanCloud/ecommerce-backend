import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrdersRepository } from 'src/modules/orders/repositories/orders.repository';
import { GetOrderByIdQuery } from '../../get-order-by-id.query';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler
  implements IQueryHandler<GetOrderByIdQuery> {
  constructor(private readonly ordersRepo: OrdersRepository) { }

  async execute(query: GetOrderByIdQuery) {
    const { userId, orderId } = query;

    const order = await this.ordersRepo.getOrderById(orderId);

    if (!order || order.userId !== userId) {
      throw new Error('Order not found or access denied');
    }

    return order;
  }
}