import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { SalesService } from './sales.service';
import { Sale } from './sale.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { ProductInventory } from 'src/products-inventories/product-inventory.entity';

@Resolver(() => Sale)
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Mutation(() => Sale)
  createSale(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return this.salesService.create(createSaleInput);
  }

  @Query(() => [Sale], { name: 'sales' })
  findAll() {
    return this.salesService.findAll();
  }

  @Query(() => Sale, { name: 'sale' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesService.findOne(id);
  }

  @ResolveField(() => ProductInventory)
  inventory(@Parent() sale: Sale) {
    return this.salesService.getInventory(sale.id);
  }

  @Mutation(() => Sale)
  updateSale(@Args('updateSaleInput') updateSaleInput: UpdateSaleInput) {
    return this.salesService.update(updateSaleInput.id, updateSaleInput);
  }

  @Mutation(() => Sale)
  removeSale(@Args('id', { type: () => Int }) id: number) {
    return this.salesService.remove(id);
  }
}
