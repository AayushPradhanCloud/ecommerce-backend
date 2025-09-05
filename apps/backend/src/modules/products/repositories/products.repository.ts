import { Inject, Injectable } from '@nestjs/common';
import { and, eq, ne } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { categories, products, type Category, type Product } from '../../../database/schema';
import { DRIZZLE } from '../../../database/tokens';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

interface MySqlResult {
  affectedRows: number;
  insertId?: number;
  warningStatus?: number;
}

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: MySql2Database,
  ) {}

  async findAll(categoryId?: number): Promise<(Product & { category?: Category })[]> {
    if (categoryId) {
      const rows = await this.db
        .select()
        .from(products)
        .where(eq(products.categoryId, categoryId))
        .orderBy(products.name)
        .execute();

      return rows;
    }

    const rows = await this.db
      .select()
      .from(products)
      .leftJoin(categories, eq(categories.id, products.categoryId))
      .orderBy(products.name)
      .execute();

    return rows.map((row) => ({
      ...row.products,
      category: row.categories || undefined,
    }));
  }

  async findById(id: number): Promise<Product | null> {
    const rows = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)
      .execute();

    return rows[0] ?? null;
  }

  async isSlugTaken(slug: string, excludeId?: number): Promise<boolean> {
    const condition = excludeId
      ? and(eq(products.slug, slug), ne(products.id, excludeId))
      : eq(products.slug, slug);

    const rows = await this.db.select().from(products).where(condition).limit(1).execute();

    return rows.length > 0;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const productData = {
      ...dto,
      price: dto.price.toString(),
    };

    const [insertedIdRow] = await this.db
      .insert(products)
      .values(productData)
      .$returningId() 
      .execute();

    if (!insertedIdRow) {
      throw new Error('Failed to create product');
    }

    const product = await this.findById(insertedIdRow.id);
    if (!product) throw new Error('Failed to fetch created product');
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const updateData = {
      ...dto,
      price: dto.price !== undefined ? dto.price.toString() : undefined,
    };

    await this.db.update(products).set(updateData).where(eq(products.id, id)).execute();

    const product = await this.findById(id);
    if (!product) throw new Error(`Product with ID ${id} not found`);
    return product;
  }

  async delete(id: number): Promise<{ success: true }> {
    const result = await this.db.delete(products).where(eq(products.id, id)).execute();

    const mysqlResult = result as unknown as MySqlResult;

    if (mysqlResult.affectedRows === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return { success: true };
  }
}