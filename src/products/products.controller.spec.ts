import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../modules/products/dtos/create-product.dto';
import { UpdateProductDto } from '../modules/products/dtos/update-product.dto';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [CommandBus, QueryBus],
    })
      .overrideProvider(CommandBus)
      .useValue({ execute: jest.fn() })
      .overrideProvider(QueryBus)
      .useValue({ execute: jest.fn() })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call queryBus.execute on list', async () => {
    const mockResponse = [{ id: 1, name: 'Product A', categoryId: 1 }];
    (queryBus.execute as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.list();
    expect(queryBus.execute).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call commandBus.execute on create', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      categoryId: 1,
      slug: 'test',
      price: 100,
      stock: 50,
    };
    const mockResponse = { id: 1, ...dto };
    (commandBus.execute as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.create(dto);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual(mockResponse);
  });

  it('should call commandBus.execute on update', async () => {
    const dto: UpdateProductDto = { name: 'Updated Name' };
    const mockResponse = { id: 1, name: 'Updated Name', categoryId: 1 };
    (commandBus.execute as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.update(1, dto);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual(mockResponse);
  });

  it('should call commandBus.execute on remove', async () => {
    const mockResponse = { id: 1, name: 'Product A', categoryId: 1 };
    (commandBus.execute as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.remove(1);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual(mockResponse);
  });
});
