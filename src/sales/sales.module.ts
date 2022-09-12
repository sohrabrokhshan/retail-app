import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesService } from './sales.service';
import { SalesResolver } from './sales.resolver';
import { Sale } from './sale.entity';
import { ProductsInventoriesModule } from './../products-inventories/products-inventories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), ProductsInventoriesModule],
  providers: [SalesResolver, SalesService],
})
export class SalesModule {}
