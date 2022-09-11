import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

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

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({id});
    
    if (! product) {
      throw new NotFoundException('The product was not found')
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
}
