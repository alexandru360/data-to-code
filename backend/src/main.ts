import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Helmet Middleware against known security vulnerabilities
  app.use(helmet());

  // Swagger API Documentation
  const options = new DocumentBuilder()
    .setTitle('Data-2-code-JS')
    .setDescription('NestJS Api for Data-2-code-JS')
    .setVersion('0.1.0')
    // You can add new tags for your controllers here
    // .addTag('/list-cols-by-table-dialect')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
