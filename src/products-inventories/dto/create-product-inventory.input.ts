import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class CreateProductInventoryInput {
  @IsNumber()
  @Field(() => Int)
  stockId: number;

  @IsNumber()
  @Field(() => Int)
  productId: number;

  @IsNumber()
  @Min(1)
  @Field(() => Int)
  quantity: number;
}
