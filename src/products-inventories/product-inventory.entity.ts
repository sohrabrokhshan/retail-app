import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Stock } from '../stocks/stock.entity';
import { Product } from '../products/product.entity';

@Entity()
@ObjectType()
export class ProductInventory {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    unsigned: true,
  })
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Int)
  stockId: number;
  
  @ManyToOne(() => Stock)
  @Field(() => Stock)
  stock: Stock;

  @Column()
  @Field(() => Int)
  productId: number;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @Field(type => Date)
  @DeleteDateColumn()
  deletedDate: Date;
}
