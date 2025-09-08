import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateCompletionDto } from '../modules/openai/dtos/create-completion.dto';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async createCompletion(dto: CreateCompletionDto) {
    const response = await this.openai.chat.completions.create({
      model: dto.model || 'gpt-4',
      messages: [{ role: 'user', content: dto.prompt }],
      max_tokens: dto.max_tokens,
    });
    return response.choices?.[0]?.message?.content;
  }
}
