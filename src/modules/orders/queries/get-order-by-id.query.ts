export class GetOrderByIdQuery {
  constructor(
    public readonly userId: number,
    public readonly orderId: number,
  ) { }
}