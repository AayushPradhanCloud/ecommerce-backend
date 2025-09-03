import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DRIZZLE } from '../../../database/tokens';
import { categories, type Category } from '../../../database/schema';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

interface MySqlResult {
  affectedRows: number;
  insertId?: number;
  warningStatus?: number;
}

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: MySql2Database,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.db.select().from(categories).orderBy(categories.name).execute();
  }

  async findById(id: number): Promise<Category | null> {
    const rows = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1)
      .execute();
    return rows[0] ?? null;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const [insertedId] = await this.db
      .insert(categories)
      .values(dto)
      .$returningId()
      .execute();

    if (!insertedId) {
      throw new Error('Failed to create category');
    }

    const category = await this.findById(insertedId.id ?? insertedId);
    if (!category) throw new Error('Failed to fetch created category');
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const result = await this.db
      .update(categories)
      .set(dto)
      .where(eq(categories.id, id))
      .execute();

    const mysqlResult = result as unknown as MySqlResult;
    if (mysqlResult.affectedRows === 0) {
      throw new Error(`Category with ID ${id} not found`);
    }

    const updatedCategory = await this.findById(id);
    if (!updatedCategory) {
      throw new Error(`Failed to fetch updated category with ID ${id}`);
    }

    return updatedCategory;
  }

  async delete(id: number): Promise<{ success: true }> {
    const result = await this.db
      .delete(categories)
      .where(eq(categories.id, id))
      .execute();

    const mysqlResult = result as unknown as MySqlResult;
    if (mysqlResult.affectedRows === 0) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return { success: true };
  }
}