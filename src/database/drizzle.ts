import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initializing Drizzle
export const db = drizzle(pool, {
  schema,
  mode: 'default',
});

export type DbType = typeof db;
