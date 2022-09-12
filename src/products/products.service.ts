import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductInventory } from 'src/products-inventories/product-inventory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(productInput: CreateProductInput) {
    const product = this.productRepo.create({
      name: productInput.name,
      description: productInput.description,
    });
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number, relations: Array<string> = []) {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: relations,
    });

    if (!product) {
      throw new NotFoundException('The product was not found');
    }

    return product;
  }

  async update(id: number, productInput: UpdateProductInput) {
    const product = await this.findOne(id);
    product.name = productInput.name;
    product.description = productInput.description;
    this.productRepo.save(product);
    return product;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    this.productRepo.remove(product);
    return product;
  }

  async getInventories(productId: number): Promise<ProductInventory[]> {
    const product = await this.findOne(productId, ['inventories']);
    return product.inventories;
  }
}
