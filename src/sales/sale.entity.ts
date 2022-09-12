import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { ProductInventory } from './../products-inventories/product-inventory.entity';

@Entity()
@ObjectType()
export class Sale {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  customer: string;

  @Column({ unsigned: true })
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Int)
  inventoryId: number;

  @ManyToOne(() => ProductInventory)
  @Field(() => ProductInventory)
  inventory: ProductInventory;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;
}
