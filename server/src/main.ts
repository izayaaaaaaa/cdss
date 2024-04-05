import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // automatically remove any properties that do not have a matching DTO property
    }),
  );
  app.enableCors();
  await app.listen(3334);
}
bootstrap();
