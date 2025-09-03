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
  const data = {
    name: dto.name,
    slug: dto.slug,
    description: dto.description ?? null,
  };

  const result: any = await this.db.insert(categories).values(data).execute();

  // Try to get inserted ID, fallback to fetching by unique slug
  const insertId = result.insertId;
  let category: Category | null = null;

  if (insertId) {
    category = await this.findById(insertId);
  } else {
    // fallback: fetch by slug
    const rows = await this.db
      .select()
      .from(categories)
      .where(eq(categories.slug, dto.slug))
      .limit(1)
      .execute();
    category = rows[0] ?? null;
  }

  if (!category) throw new Error('Failed to fetch created category');
  return category;
}


  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const result = await this.db
      .update(categories)
      .set(dto)
      .where(eq(categories.id, id))
      .execute();

    const affectedRows = (result as any).affectedRows ?? 0;
    if (affectedRows === 0) {
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

    const affectedRows = (result as any).affectedRows ?? 0;
    if (affectedRows === 0) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return { success: true };
  }
}
