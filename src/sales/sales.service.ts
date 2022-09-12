import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Sale } from './sale.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { ProductsInventoriesService } from './../products-inventories/products-inventories.service';
import { ProductInventory } from './../products-inventories/product-inventory.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    private inventoryService: ProductsInventoriesService,
  ) {}

  async create(createSaleInput: CreateSaleInput): Promise<Sale> {
    const inventory = await this.inventoryService.findOne(
      createSaleInput.inventoryId,
    );
    this.validateInventoryQuantity(inventory, createSaleInput.quantity);
    this.inventoryService.decreaseQuantity(inventory, createSaleInput.quantity);

    const sale = this.saleRepo.create({
      customer: createSaleInput.customer,
      quantity: createSaleInput.quantity,
      description: createSaleInput.description,
    });

    sale.inventory = inventory;
    return this.saleRepo.save(sale);
  }

  findAll(): Promise<Sale[]> {
    return this.saleRepo.find();
  }

  async findOne(id: number, relations: Array<string> = []): Promise<Sale> {
    const sale = await this.saleRepo.findOne({
      where: { id: id },
      relations: relations,
    });

    if (!sale) {
      throw new NotFoundException('The sale model was not found');
    }

    return sale;
  }

  async update(id: number, updateSaleInput: UpdateSaleInput): Promise<Sale> {
    const sale = await this.findOne(id, ['inventory']);
    const oldInventory = sale.inventory;
    const newInventory = await this.inventoryService.findOne(
      updateSaleInput.inventoryId,
    );

    if (oldInventory.id === newInventory.id) {
      this.validateInventoryQuantity(
        newInventory,
        updateSaleInput.quantity,
        sale.quantity,
      );
      this.inventoryService.decreaseQuantity(
        newInventory,
        updateSaleInput.quantity - sale.quantity,
      );
    } else {
      this.validateInventoryQuantity(newInventory, updateSaleInput.quantity);
      this.inventoryService.increaseQuantity(oldInventory, sale.quantity);
      this.inventoryService.decreaseQuantity(
        newInventory,
        updateSaleInput.quantity,
      );
      sale.inventory = newInventory;
    }

    sale.customer = updateSaleInput.customer;
    sale.quantity = updateSaleInput.quantity;
    sale.description = updateSaleInput.description;
    return this.saleRepo.save(sale);
  }

  async remove(id: number): Promise<Sale> {
    const sale = await this.findOne(id, ['inventory']);
    this.inventoryService.increaseQuantity(sale.inventory, sale.quantity);
    this.saleRepo.remove(sale);
    return sale;
  }

  async getInventory(saleId: number): Promise<ProductInventory> {
    const sale = await this.findOne(saleId, ['inventory']);
    return sale.inventory;
  }

  private validateInventoryQuantity(
    inventory: ProductInventory,
    newQuantity: number,
    oldQuantity: number = 0,
  ): boolean {
    if (newQuantity - oldQuantity > inventory.quantity) {
      throw new BadRequestException(
        'The sale quantity can not be greater of its inventory quantity',
      );
    }

    return true;
  }
}
