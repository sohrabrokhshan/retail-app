import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInventoriesResolver } from './products-inventories.resolver';
import { ProductsInventoriesService } from './products-inventories.service';

describe('ProductsInventoriesResolver', () => {
  let resolver: ProductsInventoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsInventoriesResolver, ProductsInventoriesService],
    }).compile();

    resolver = module.get<ProductsInventoriesResolver>(ProductsInventoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
