import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Role } from '../../common/enum/role.enum';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the new user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password for the new account (minimum 6 characters)',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: Role.Customer,
    description: 'Role of the user (optional, defaults to customer)',
    enum: Role,
    enumName: 'Role',
    required: false,
  })
  @IsOptional()
  @IsIn([Role.Admin, Role.Customer])
  role?: Role;
}
