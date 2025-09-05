import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(cookieParser());

  // ❌ REMOVE these:
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );

  app.useGlobalPipes(new ZodValidationPipe());

  app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
