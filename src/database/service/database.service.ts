import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../schema/users.schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name);
  public db: MySql2Database<typeof schema>;
  private pool: mysql.Pool;

  async onModuleInit(): Promise<void> {
    try {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'ecommerce_db',
        connectionLimit: 10,
      });

      await this.pool.query('SELECT 1');

      this.db = drizzle(this.pool, { schema, mode: 'default' });

      this.logger.log('Drizzle ORM connected to MySQL!');
    } catch (error: unknown) {
      this.logger.error('Failed to connect to database:', error);
      throw new Error('Database connection failed');
    }
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Application shutting down... signal: ${signal}`);
    if (this.pool) {
      await this.pool.end();
      this.logger.log('MySQL pool has been closed.');
    }
  }
}
