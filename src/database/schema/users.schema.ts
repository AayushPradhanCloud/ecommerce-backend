import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import Joi from 'joi';

// ------------------- TABLES -------------------
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

export const insertUserSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).required(),
  role: Joi.string().max(50).default('customer'),
});

export const selectUserSchema = Joi.object({
  id: Joi.number().integer().required(),
  email: Joi.string().email().max(255).required(),
  role: Joi.string().max(50).required(),
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

// ------------------- TYPES -------------------
export type User = {
  id: number;
  email: string;
  role: string;
  createdAt?: Date;
};

export type InsertUser = {
  email: string;
  password: string;
  role?: string;
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
