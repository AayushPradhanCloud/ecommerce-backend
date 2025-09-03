import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('customer').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const refreshTokens = mysqlTable('refresh_tokens', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  tokenHash: varchar('token_hash', { length: 255 }).notNull(),
  isRevoked: boolean('is_revoked').default(false).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});
export const selectUserSchema = createSelectSchema(users).omit({
  password: true,
});

export const insertRefreshTokenSchema = createInsertSchema(refreshTokens).omit({
  id: true,
  createdAt: true,
});
export const selectRefreshTokenSchema = createSelectSchema(refreshTokens);

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type RefreshToken = z.infer<typeof selectRefreshTokenSchema>;
export type InsertRefreshToken = z.infer<typeof insertRefreshTokenSchema>;
