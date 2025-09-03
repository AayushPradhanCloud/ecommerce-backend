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
          uri: process.env.DATABASE_URL,
          connectionLimit: 10,
          namedPlaceholders: true,
        });
        const db = drizzle(pool, { schema: schemas, mode: 'default' });
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
