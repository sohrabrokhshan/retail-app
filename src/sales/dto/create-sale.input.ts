import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber, MaxLength, MinLength, Min, IsOptional } from 'class-validator';
import { Max } from 'class-validator';

@InputType()
export class CreateSaleInput {
  @Field()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  customer: string;

  @IsNumber()
  @Min(1)
  @Max(99999990)
  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  @IsNumber()
  inventoryId: number;

  @Field()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
