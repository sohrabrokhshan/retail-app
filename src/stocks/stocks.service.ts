import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Stock } from './stock.entity';
import { CreateStockInput } from './dto/create-stock.input';
import { UpdateStockInput } from './dto/update-stock.input';

@Injectable()
export class StocksService {
  constructor(@InjectRepository(Stock) private stockRepo: Repository<Stock>) {}

  create(createStockInput: CreateStockInput) {
    const stock = this.stockRepo.create({
      name: createStockInput.name,
      address: createStockInput.address
    });
    return this.stockRepo.save(stock);
  }

  findAll() {
    return this.stockRepo.find();
  }

  async findOne(id: number) {
    const stock = await this.stockRepo.findOneBy({id});

    if (! stock) {
      throw new NotFoundException('The stock was not found');
    }

    return stock;
  }

  async update(id: number, updateStockInput: UpdateStockInput) {
    const stock = await this.findOne(id);
    stock.name = updateStockInput.name;
    stock.address = updateStockInput.address;
    return this.stockRepo.save(stock);
  }

  async remove(id: number) {
    const stock = await this.findOne(id);
    this.stockRepo.remove(stock);
    return stock;
  }
}
