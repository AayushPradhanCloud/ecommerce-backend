import { IsString, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(['cart', 'pending', 'completed', 'cancelled'])
  status: string;
}