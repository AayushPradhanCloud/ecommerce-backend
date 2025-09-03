import { Module, Global } from '@nestjs/common';
import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schemas from './schema';
import { DRIZZLE } from './tokens';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const pool = await createPool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '3306', 10),
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASS || '',
          database: process.env.DB_NAME || 'ecomerce_db',
          connectionLimit: 10,
          namedPlaceholders: true,
        });

        const db = drizzle(pool, {
          schema: schemas,
          mode: 'default',
          logger: true,
        });

        const [row] = await pool.query('SELECT DATABASE() AS db');
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
