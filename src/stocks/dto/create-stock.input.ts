import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateStockInput {
  @Field()
  @IsString()
  @MaxLength(100)
  name: string;

  @Field()
  @IsString()
  @MaxLength(255)
  address: string;
}
