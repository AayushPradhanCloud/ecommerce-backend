import { OrderItemDto } from "../dtos/create-order.dto";

export class CreateOrderCommand {
    constructor(
        public readonly userId: number,
        public readonly items: OrderItemDto[],
    ) { }
}
