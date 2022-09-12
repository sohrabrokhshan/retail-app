import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInventoriesService } from './products-inventories.service';

describe('ProductsInventoriesService', () => {
  let service: ProductsInventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsInventoriesService],
    }).compile();

    service = module.get<ProductsInventoriesService>(ProductsInventoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
