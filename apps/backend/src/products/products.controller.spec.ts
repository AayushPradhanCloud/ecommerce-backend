import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService, Product } from '../modules/products/services/products.service';
import { CreateProductDto } from '../modules/products/dtos/create-product.dto';
import { UpdateProductDto } from '../modules/products/dtos/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct: Product = {
    id: 1,
    name: 'Product A',
    categoryId: 1,
    slug: 'product-a',
    price: 100,
    stock: 50,
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll on list', async () => {
    mockProductsService.findAll.mockResolvedValue([mockProduct]);
    const result = await controller.list();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });

  it('should call findOne on findOne', async () => {
    mockProductsService.findOne.mockResolvedValue(mockProduct);
    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  it('should call create on create', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      categoryId: 1,
      slug: 'test',
      price: 100,
      stock: 50,
    };
    const createdProduct: Product = { id: 2, ...dto };
    mockProductsService.create.mockResolvedValue(createdProduct);

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdProduct);
  });

  it('should call update on update', async () => {
    const dto: UpdateProductDto = { name: 'Updated Name' };
    const updatedProduct: Product = { ...mockProduct, ...dto };
    mockProductsService.update.mockResolvedValue(updatedProduct);

    const result = await controller.update(1, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(updatedProduct);
  });

  it('should call remove on remove', async () => {
    mockProductsService.remove.mockResolvedValue(mockProduct);
    const result = await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });
});
