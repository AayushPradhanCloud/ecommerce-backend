import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import { resolve } from 'path';
import * as schema from '../schema/users.schema';

@Injectable()
export class DatabaseService
  implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
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

      // Test connection
      await this.pool.query('SELECT 1');

      this.db = drizzle(this.pool, { schema, mode: 'default' });

      this.logger.log('Drizzle ORM connected to MySQL');
    } catch (error) {
      this.logger.error('Failed to connect to database:', error);
      throw new Error('Database connection failed');
    }
  }

  async onApplicationBootstrap(): Promise<void> {
    try {
      this.logger.log('Running pending migrations...');

      await migrate(this.db, {
        migrationsFolder: resolve(process.cwd(), 'drizzle'),
      });

      this.logger.log('Migrations completed successfully');

      // Optional warm-up query
      await this.db.execute('SELECT 1');
      this.logger.log('Database connection warmed up');
    } catch (error: any) {
      if (error.code === 'ER_TABLE_EXISTS_ERROR') {
        this.logger.warn('Some tables already exist, skipping creation');
      } else if (error.message.includes('meta/_journal.json')) {
        this.logger.error(
          'Migration journal not found. Make sure `drizzle/meta/_journal.json` exists and is accessible',
        );
      } else {
        this.logger.error('Migration failed:', error);
        throw error;
      }
    }
  }

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application shutting down... signal: ${signal ?? 'N/A'}`);
    if (this.pool) {
      try {
        await this.pool.end();
        this.logger.log('MySQL pool has been closed');
      } catch (err) {
        this.logger.error('Error closing MySQL pool:', err);
      }
    }
  }
}