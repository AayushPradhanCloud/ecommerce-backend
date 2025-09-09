import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/database/schema/**/*.ts',

  out: './drizzle',

  dialect: 'mysql',

  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'ecommerce_db',
  },
  verbose: true,
  strict: true,
};

export default config;