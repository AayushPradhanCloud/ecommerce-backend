import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/database/schema/**/*.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME!,
  },
  verbose: true,
  strict: true,
};

export default config;
