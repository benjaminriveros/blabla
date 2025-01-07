import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, //Convierte datos al tipo correcto (p.e de string a number)
    whitelist: true, //Elimina propiedades no declaradas en el DTO
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
