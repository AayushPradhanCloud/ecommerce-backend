import { sql } from 'drizzle-orm';
import { boolean, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import Joi from 'joi';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  role: varchar('role', { length: 50 }).notNull().default('customer'),
  casdoorId: varchar('casdoor_id', { length: 255 }).unique(),
  username: varchar('username', { length: 255 }),
  displayName: varchar('display_name', { length: 255 }),
  avatar: varchar('avatar', { length: 500 }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const refreshTokens = mysqlTable('refresh_tokens', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  tokenHash: varchar('token_hash', { length: 255 }).notNull(),
  isRevoked: boolean('is_revoked').notNull().default(false),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = Joi.object({
  email: Joi.string().email().max(255),
  password: Joi.string().max(255).allow(null),
  role: Joi.string().max(50).default('customer'),
  casdoorId: Joi.string().max(255),
  username: Joi.string().max(255),
  displayName: Joi.string().max(255),
  avatar: Joi.string().max(500),
});

export const selectUserSchema = Joi.object({
  id: Joi.number().integer().required(),
  email: Joi.string().email().max(255).allow(null),
  role: Joi.string().max(50).required(),
  casdoorId: Joi.string().max(255).allow(null),
  username: Joi.string().max(255).allow(null),
  displayName: Joi.string().max(255).allow(null),
  avatar: Joi.string().max(500).allow(null),
  createdAt: Joi.date(),
});

export const insertRefreshTokenSchema = Joi.object({
  userId: Joi.number().integer().required(),
  tokenHash: Joi.string().max(255).required(),
  isRevoked: Joi.boolean().default(false),
});

export const selectRefreshTokenSchema = Joi.object({
  id: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  tokenHash: Joi.string().max(255).required(),
  isRevoked: Joi.boolean().required(),
  createdAt: Joi.date(),
});

export type User = {
  id: number;
  email?: string;
  password?: string | null;
  role: string;
  casdoorId?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  createdAt?: Date;
};

export type InsertUser = {
  email?: string;
  password?: string | null;
  role?: string;
  casdoorId?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
};

export type RefreshToken = {
  id: number;
  userId: number;
  tokenHash: string;
  isRevoked: boolean;
  createdAt?: Date;
};

export type InsertRefreshToken = {
  userId: number;
  tokenHash: string;
  isRevoked?: boolean;
};
