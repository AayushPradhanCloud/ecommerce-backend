import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  schema: './src/database/schema/*.schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined, 
    database: process.env.DB_NAME || 'ecommerce_db',
    port: parseInt(process.env.DB_PORT || '3306'),
  },
  verbose: true,
  strict: true,
} satisfies Config;