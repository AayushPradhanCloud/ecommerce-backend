import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService, Product } from '../modules/products/services/products.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductDto } from '../modules/products/dtos/create-product.dto';
import { UpdateProductDto } from '../modules/products/dtos/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const mockCommandBus = { execute: jest.fn() };
  const mockQueryBus = { execute: jest.fn() };

  const mockProduct: Product = {
    id: 1,
    name: 'Product A',
    categoryId: 1,
    slug: 'product-a',
    price: 100,
    stock: 50,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: CommandBus, useValue: mockCommandBus },
        { provide: QueryBus, useValue: mockQueryBus },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findAll returns result from QueryBus', async () => {
    mockQueryBus.execute.mockResolvedValue([mockProduct]);
    await expect(service.findAll()).resolves.toEqual([mockProduct]);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('findOne returns result from QueryBus', async () => {
    mockQueryBus.execute.mockResolvedValue(mockProduct);
    await expect(service.findOne(1)).resolves.toEqual(mockProduct);
    expect(mockQueryBus.execute).toHaveBeenCalledWith(expect.any(Object));
  });

  it('create returns result from CommandBus', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      categoryId: 1,
      slug: 'test',
      price: 50,
      stock: 10,
    };
    mockCommandBus.execute.mockResolvedValue({ id: 2, ...dto });

    await expect(service.create(dto)).resolves.toEqual({ id: 2, ...dto });
    expect(mockCommandBus.execute).toHaveBeenCalledWith(expect.any(Object));
  });

  it('update returns result from CommandBus', async () => {
    const dto: UpdateProductDto = { name: 'Updated' };
    mockCommandBus.execute.mockResolvedValue({ ...mockProduct, ...dto });

    await expect(service.update(1, dto)).resolves.toEqual({ ...mockProduct, ...dto });
    expect(mockCommandBus.execute).toHaveBeenCalledWith(expect.any(Object));
  });

  it('remove returns result from CommandBus', async () => {
    mockCommandBus.execute.mockResolvedValue(mockProduct);

    await expect(service.remove(1)).resolves.toEqual(mockProduct);
    expect(mockCommandBus.execute).toHaveBeenCalledWith(expect.any(Object));
  });
});
