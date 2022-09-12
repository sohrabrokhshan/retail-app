import { CreateSaleInput } from './create-sale.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateSaleInput extends PartialType(CreateSaleInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
