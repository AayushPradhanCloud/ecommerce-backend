import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty({
        example: 1,
        description: 'User ID of the logged-in user',
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Valid refresh token',
    })
    @IsNotEmpty()
    refreshToken: string;
}
