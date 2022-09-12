import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsInventoriesService } from './products-inventories.service';
import { ProductInventory } from './product-inventory.entity';

import { CreateProductInventoryInput } from './dto/create-product-inventory.input';
import { UpdateProductInventoryInput } from './dto/update-product-inventory.input';
import { Stock } from 'src/stocks/stock.entity';
import { Product } from 'src/products/product.entity';

@Resolver(() => ProductInventory)
export class ProductsInventoriesResolver {
  constructor(
    private readonly productsInventoriesService: ProductsInventoriesService,
  ) {}

  @Mutation(() => ProductInventory)
  createProductInventory(
    @Args('createProductInventoryInput')
    createProductInventoryInput: CreateProductInventoryInput,
  ) {
    return this.productsInventoriesService.create(createProductInventoryInput);
  }

  @Query(() => [ProductInventory], { name: 'productsInventories' })
  findAll() {
    return this.productsInventoriesService.findAll();
  }

  @Query(() => ProductInventory, { name: 'ProductInventory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsInventoriesService.findOne(id);
  }

  @ResolveField(() => Stock)
  stock(@Parent() inventory: ProductInventory) {
    return this.productsInventoriesService.getStock(inventory.stockId);
  }

  @ResolveField(() => Product)
  product(@Parent() inventory: ProductInventory) {
    return this.productsInventoriesService.getProduct(inventory.productId);
  }

  @Mutation(() => ProductInventory)
  updateProductInventory(
    @Args('updateProductInventoryInput')
    updateProductInventoryInput: UpdateProductInventoryInput,
  ) {
    return this.productsInventoriesService.update(
      updateProductInventoryInput.id,
      updateProductInventoryInput,
    );
  }

  @Mutation(() => ProductInventory)
  removeProductInventory(@Args('id', { type: () => Int }) id: number) {
    return this.productsInventoriesService.remove(id);
  }

  @Mutation(() => ProductInventory)
  restoreProductInventory(@Args('id', { type: () => Int }) id: number) {
    return this.productsInventoriesService.restore(id);
  }
}
