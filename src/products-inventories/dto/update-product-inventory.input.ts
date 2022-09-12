import { CreateProductInventoryInput } from './create-product-inventory.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInventoryInput extends PartialType(CreateProductInventoryInput) {
  @Field(() => Int)
  id: number;
}
