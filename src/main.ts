import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // New instance of Logger to log custom messages to the console
  const logger = new Logger('Boostrap');
  // Add global middlewares E.g '{base-url}/api/{endpoint}'
  app.setGlobalPrefix('api');
  // Add global pipes E.g 'ValidationPipe' to validate request body and query params before controller method execution
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT || 3000);
  logger.log(`App running on port: ${process.env.PORT}`);
}
bootstrap();
