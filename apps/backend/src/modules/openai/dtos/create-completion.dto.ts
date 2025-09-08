import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const CreateCompletionSchema = z.object({
  prompt: z.string().min(1),
  model: z.string().default('gpt-4'),
  max_tokens: z.number().optional(),
});

export class CreateCompletionDto {
  @ApiProperty({ example: 'Hello, how are you?' })
  prompt: string;

  @ApiProperty({ example: 'gpt-4', required: false })
  model?: string;

  @ApiProperty({ example: 100, required: false })
  max_tokens?: number;
}
