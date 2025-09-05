import { IsInt, IsPositive } from 'class-validator';

export class AddCartItemDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

export class RemoveCartItemDto {
  @IsInt()
  @IsPositive()
  productId: number;
}
