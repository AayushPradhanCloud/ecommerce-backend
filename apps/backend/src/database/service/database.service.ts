import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../schema/users.schema';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  public db: MySql2Database<typeof schema>;

  async onModuleInit(): Promise<void> {
    try {
      const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'ecommerce_db',
        connectionLimit: 10,
      });

      await pool.query('SELECT 1');

      this.db = drizzle(pool, { schema, mode: 'default' });

      this.logger.log(' Drizzle ORM connected to MySQL!');
    } catch (error: unknown) {
      this.logger.error(' Failed to connect to database:', error);
      throw new Error('Database connection failed');
    }
  }
}
