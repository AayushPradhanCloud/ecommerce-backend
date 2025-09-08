import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { CreateCompletionDto } from '../modules/openai/dtos/create-completion.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('OpenAI')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('completion')
  @ApiOperation({ summary: 'Generate text completion using OpenAI' })
  @ApiResponse({ status: 201, description: 'Completion generated successfully' })
  async createCompletion(@Body() dto: CreateCompletionDto) {
    return this.openaiService.createCompletion(dto);
  }
}
