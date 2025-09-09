import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './service/database.service';
import { DRIZZLE } from './tokens';

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: DRIZZLE,
      useFactory: (dbService: DatabaseService) => dbService.db,
      inject: [DatabaseService],
    },
  ],
  exports: [DatabaseService, DRIZZLE],
})
export class DatabaseModule { }
