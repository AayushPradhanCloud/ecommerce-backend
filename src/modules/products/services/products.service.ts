import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async findAll(categoryId?: number) {
    return this.repo.findAll(categoryId);
  }

  async findById(id: number) {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Product not found');
    return row;
  }

  async create(dto: CreateProductDto) {
    const taken = await this.repo.isSlugTaken(dto.slug);
    if (taken) throw new BadRequestException('Slug is already taken');
    return this.repo.create(dto);
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findById(id);
    if (dto.slug) {
      const taken = await this.repo.isSlugTaken(dto.slug, id);
      if (taken) throw new BadRequestException('Slug is already taken');
    }
    return this.repo.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repo.delete(id);
  }
}
