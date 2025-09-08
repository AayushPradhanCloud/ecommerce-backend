import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { ZodValidationPipe, patchNestjsSwagger } from '@anatine/zod-nestjs';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(cookieParser());

  app.useGlobalPipes(new ZodValidationPipe());
  app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix('api');

  patchNestjsSwagger();

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('API documentation including OpenAI + Zod endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use('/openapi.json', (req, res) => res.json(document));

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`Backend running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
  console.log(`OpenAPI JSON at http://localhost:${port}/openapi.json`);
}

bootstrap();
