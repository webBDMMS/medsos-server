import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API MEDSOS-APP')
    .setDescription('Ini adalah dokumentasi API Medsos-App ganesha operation')
    .setVersion('1.0')
    // .addServer('http://localhost:5050/', 'Local environment')
    .addServer('https://dev-api-medsos.ganeshaoperation.com/', 'Staging')
    // .addServer('https://production.yourapi.com/', 'Production')
    .addTag('Medsos-App')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('Medsos-App', app, document);
  app.enableCors();
  await app.listen(5050);
}
bootstrap();
