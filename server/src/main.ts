import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'chrome-extension://ncgaijpgdjclehpjokjhdldeinjfojpn',
    ], // add chrome extension
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
