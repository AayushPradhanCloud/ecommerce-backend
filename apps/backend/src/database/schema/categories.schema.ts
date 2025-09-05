import { mysqlTable, serial, varchar, text } from 'drizzle-orm/mysql-core';

export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull().unique(),
  slug: varchar('slug', { length: 191 }).notNull().unique(),
  description: text('description'),
});

export type Category = typeof categories.$inferSelect;
