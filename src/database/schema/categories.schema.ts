import { mysqlTable, int, varchar, text } from 'drizzle-orm/mysql-core';

export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 191 }).notNull().unique(),
  slug: varchar('slug', { length: 191 }).notNull().unique(),
  description: text('description'),
});
