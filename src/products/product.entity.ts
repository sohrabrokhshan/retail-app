import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Field({nullable: true})
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;
}
