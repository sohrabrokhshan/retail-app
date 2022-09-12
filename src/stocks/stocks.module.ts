import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StocksService } from './stocks.service';
import { StocksResolver } from './stocks.resolver';
import { Stock } from './stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StocksResolver, StocksService],
  exports: [StocksService],
})
export class StocksModule {}
