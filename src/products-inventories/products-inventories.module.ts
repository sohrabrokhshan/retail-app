import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsInventoriesService } from './products-inventories.service';
import { ProductsInventoriesResolver } from './products-inventories.resolver';
import { ProductInventory } from './product-inventory.entity';
import { StocksModule } from './../stocks/stocks.module';
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInventory]),
    StocksModule,
    ProductsModule,
  ],
  providers: [ProductsInventoriesResolver, ProductsInventoriesService],
  exports: [ProductsInventoriesService]
})
export class ProductsInventoriesModule {}
