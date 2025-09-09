import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompletionDto } from '../modules/openai/dtos/create-completion.dto';
import { OpenaiService } from './openai.service';

@ApiTags('OpenAI')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) { }

  @Post('completion')
  @ApiOperation({ summary: 'Generate text completion using OpenAI' })
  @ApiResponse({ status: 201, description: 'Completion generated successfully' })
  async createCompletion(@Body() dto: CreateCompletionDto) {
    return this.openaiService.createCompletion(dto);
  }
}
