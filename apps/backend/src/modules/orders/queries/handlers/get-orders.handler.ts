import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrdersRepository } from '../../repositories/orders.repository';
import { GetOrdersQuery } from '../get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly ordersRepo: OrdersRepository) { }

  async execute(query: GetOrdersQuery) {
    const { userId } = query;
    return this.ordersRepo.getOrdersByUser(userId);
  }
}