import { Inject, Injectable } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { orderItems, orders } from '../../../database/schema/orders.schema';
import { products } from '../../../database/schema/products.schema';
import { DRIZZLE } from '../../../database/tokens';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: MySql2Database,
  ) { }

  // Create new order/cart
  async createOrder(
    userId: number,
    items: { productId: number; quantity: number; price: string }[],
  ): Promise<number> {
    const totalPrice = items
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);

    const result: any = await this.db
      .insert(orders)
      .values({ userId, totalPrice, status: 'cart' })
      .execute();

    return result.insertId;
  }

  // Add items to order
  async addItems(
    orderId: number,
    items: { productId: number; quantity: number; price: string }[],
  ) {
    const rows = items.map((item) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await this.db.insert(orderItems).values(rows).execute();
  }

  // Deduct stock from products
  async deductStock(items: CreateOrderDto['items']): Promise<void> {
    for (const item of items) {
      const [product] = await this.db
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .execute();

      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock < item.quantity)
        throw new Error(`Insufficient stock for product ${product.name}`);

      await this.db
        .update(products)
        .set({ stock: product.stock - item.quantity })
        .where(eq(products.id, item.productId))
        .execute();
    }
  }

  // Get a single order by ID (with items)
  async getOrderById(orderId: number) {
    const [order] = await this.db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .execute();

    if (!order) return null;

    const items = await this.db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId))
      .execute();

    return { ...order, items };
  }

  // Get a product by ID
  async getProductById(productId: number) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .execute();

    return product || null;
  }

  // Get all orders of a user
  async getOrdersByUser(userId: number) {
    const userOrders = await this.db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))
      .execute();

    type OrderWithItems = typeof orders.$inferSelect & {
      items: (typeof orderItems.$inferSelect)[];
    };

    const ordersWithItems: OrderWithItems[] = [];
    for (const order of userOrders) {
      const items = await this.db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id))
        .execute();

      ordersWithItems.push({ ...order, items });
    }

    return ordersWithItems;
  }
}
