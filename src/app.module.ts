import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResolver } from './app.resolver';
import { StocksModule } from './stocks/stocks.module';
import { Stock } from './stocks/stock.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { ProductsInventoriesModule } from './products-inventories/products-inventories.module';
import { ProductInventory } from './products-inventories/product-inventory.entity';
import { SalesModule } from './sales/sales.module';
import { Sale } from './sales/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Stock, Product, ProductInventory, Sale],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/schema.gql',
      debug: true,
      playground: true,
    }),
    StocksModule,
    ProductsModule,
    ProductsInventoriesModule,
    SalesModule
  ],
  providers: [AppResolver],
})
export class AppModule {}
