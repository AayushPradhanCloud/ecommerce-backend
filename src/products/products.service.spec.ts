import { ProductsService } from '../modules/products/services/products.service';

describe('ProductsService (unit)', () => {
  let service: ProductsService;
  const repo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    isSlugTaken: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductsService(repo as any);
  });

  it('findAll returns repo result', async () => {
    repo.findAll.mockResolvedValue([{ id: 1 }]);
    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);
  });

  it('findById throws if missing', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(service.findById(123)).rejects.toThrow('Product not found');
  });

  it('create rejects duplicate slug', async () => {
    repo.isSlugTaken.mockResolvedValue(true);
    await expect(
      service.create({ name: 'A', slug: 'a', price: 9.99, stock: 1, categoryId: 1 }),
    ).rejects.toThrow('Slug is already taken');
  });

  it('create returns created row', async () => {
    repo.isSlugTaken.mockResolvedValue(false);
    repo.create.mockResolvedValue({ id: 1 });
    await expect(
      service.create({ name: 'A', slug: 'a', price: 9.99, stock: 1, categoryId: 1 }),
    ).resolves.toEqual({ id: 1 });
  });

  it('update checks existence and slug', async () => {
    repo.findById.mockResolvedValue({ id: 1 });
    repo.isSlugTaken.mockResolvedValue(false);
    repo.update.mockResolvedValue({ id: 1, name: 'X' });
    await expect(service.update(1, { name: 'X', slug: 'x' })).resolves.toEqual({
      id: 1,
      name: 'X',
    });
  });

  it('delete checks existence', async () => {
    repo.findById.mockResolvedValue({ id: 1 });
    repo.delete.mockResolvedValue({ success: true });
    await expect(service.delete(1)).resolves.toEqual({ success: true });
  });
});
