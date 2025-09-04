import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { categories, type Category } from '../../../database/schema';
import { DRIZZLE } from '../../../database/tokens';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: MySql2Database,
  ) {}

  async findAll(): Promise<{ success: true; message: string; categories: Category[] }> {
    const rows = await this.db.select().from(categories).orderBy(categories.name).execute();
    return {
      success: true,
      message: `${rows.length} categories found`,
      categories: rows,
    };
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

  async create(
    dto: CreateCategoryDto,
  ): Promise<{ success: true; message: string; category: Category }> {
    const data = {
      name: dto.name,
      slug: dto.slug,
      description: dto.description ?? null,
    };

    const result: any = await this.db.insert(categories).values(data).execute();
    const insertId = result.insertId;

    let category: Category | null = null;
    if (insertId) {
      category = await this.findById(insertId);
    } else {
      const rows = await this.db
        .select()
        .from(categories)
        .where(eq(categories.slug, dto.slug))
        .limit(1)
        .execute();
      category = rows[0] ?? null;
    }

    if (!category) throw new Error('Failed to fetch created category');

    return {
      success: true,
      message: 'Category successfully created',
      category,
    };
  }

  // Update existing category
  async update(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<{ success: true; message: string; category: Category }> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error(`Category with ID ${id} not found`);
    }

    try {
      await this.db.update(categories).set(dto).where(eq(categories.id, id)).execute();

      const updated = await this.findById(id);
      if (!updated) throw new Error(`Category with ID ${id} not found after update`);

      return {
        success: true,
        message: 'Category successfully updated',
        category: updated,
      };
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error(`Category with slug "${dto.slug}" already exists`);
      }
      throw err;
    }
  }

  // Delete a category
  async delete(id: number): Promise<{ success: true; message: string; deleted: Category }> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error(`Category with ID ${id} not found`);
    }

    await this.db.delete(categories).where(eq(categories.id, id)).execute();

    return {
      success: true,
      message: 'Category successfully deleted',
      deleted: existing,
    };
  }
}
