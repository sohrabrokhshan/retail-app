import { CreateStockInput } from './create-stock.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateStockInput extends PartialType(CreateStockInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
