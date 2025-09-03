import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  slug!: string;

  @IsString()
  @IsOptional()
  description?: string;
}
