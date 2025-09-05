import { relations } from 'drizzle-orm';
import { decimal, int, mysqlTable, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { products } from './products.schema';
import { users } from './users.schema';

// ------------------- ORDERS TABLE -------------------
export const orders = mysqlTable('orders', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull().default('0.00'),
  status: varchar('status', { length: 50 }).notNull().default('cart'), // cart, pending, completed
  createdAt: timestamp('created_at').defaultNow(),
});

// ------------------- ORDER ITEMS TABLE -------------------
export const orderItems = mysqlTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: int('order_id').notNull(),
  productId: int('product_id').notNull(),
  quantity: int('quantity').notNull().default(1),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // store price at time of order
  createdAt: timestamp('created_at').defaultNow(),
});

// ------------------- RELATIONS -------------------
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}));

// ------------------- TYPES -------------------
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
