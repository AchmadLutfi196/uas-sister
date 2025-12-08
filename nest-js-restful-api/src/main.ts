/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './middleware/all-exception-filter/all-exception-filter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: [
      'http://127.0.0.1:8000',
      'http://localhost:5173',
      'http://localhost:5175',
      'http://127.0.0.1',
      'http://localhost',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-API-TOKEN', 'Authorization'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Next Siakad')
    .setDescription('The Next Siakad API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
