import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductInventoryInput } from './dto/create-product-inventory.input';
import { UpdateProductInventoryInput } from './dto/update-product-inventory.input';
import { ProductInventory } from './product-inventory.entity';
import { Product } from './../products/product.entity';
import { Stock } from './../stocks/stock.entity';
import { StocksService } from './../stocks/stocks.service';
import { ProductsService } from './../products/products.service';

@Injectable()
export class ProductsInventoriesService {
  constructor(
    @InjectRepository(ProductInventory)
    private inventoryRepo: Repository<ProductInventory>,
    private productsService: ProductsService,
    private stocksService: StocksService,
  ) {}

  async create(
    createProductInventoryInput: CreateProductInventoryInput,
  ): Promise<ProductInventory> {
    const inventory = this.inventoryRepo.create({
      quantity: createProductInventoryInput.quantity,
    });

    const stock = await this.stocksService.findOne(
      createProductInventoryInput.stockId,
    );
    const product = await this.productsService.findOne(
      createProductInventoryInput.productId,
    );

    inventory.stock = stock;
    inventory.product = product;
    return this.inventoryRepo.save(inventory);
  }

  findAll(): Promise<ProductInventory[]> {
    return this.inventoryRepo.find();
  }

  async findOne(id: number): Promise<ProductInventory> {
    const inventory = this.inventoryRepo.findOneBy({ id });

    if (!inventory) {
      throw new NotFoundException('The inventory was not found');
    }

    return inventory;
  }

  async update(
    id: number,
    updateProductInventoryInput: UpdateProductInventoryInput,
  ): Promise<ProductInventory> {
    const inventory = await this.findOne(id);
    inventory.quantity = updateProductInventoryInput.quantity;
    const stock = await this.stocksService.findOne(
      updateProductInventoryInput.stockId,
    );
    const product = await this.productsService.findOne(
      updateProductInventoryInput.productId,
    );
    inventory.stock = stock;
    inventory.product = product;

    return this.inventoryRepo.save(inventory);
  }

  async remove(id: number): Promise<ProductInventory> {
    const inventory = await this.findOne(id);
    this.inventoryRepo.softRemove(inventory);
    return inventory;
  }

  async restore(id: number): Promise<ProductInventory> {
    await this.inventoryRepo.restore(id);
    return this.findOne(id);
  }

  getStock(stockId: number): Promise<Stock> {
    return this.stocksService.findOne(stockId);
  }

  getProduct(productId: number): Promise<Product> {
    return this.productsService.findOne(productId);
  }
}
