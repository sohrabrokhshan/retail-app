import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @MaxLength(100)
  name: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
