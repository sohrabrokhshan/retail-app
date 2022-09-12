import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ProductInventory } from 'src/products-inventories/product-inventory.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field({ nullable: true })
  description?: string;

  @OneToMany(
    () => ProductInventory,
    (inventory: ProductInventory) => inventory.product,
  )
  @Field(() => [ProductInventory])
  inventories: ProductInventory[];
}
