import { NestFactory } from '@nestjs/core';
const xXssProtection = require('x-xss-protection');
import * as mongoSanitize from 'express-mongo-sanitize';
import * as helmet from 'helmet';
import { AppModule } from './module';
import { Seeder } from './utils/seeder';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';

(async () => {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const seedService = app.get(Seeder);

  await seedService.seed();

  app.use(helmet());
  app.use(xXssProtection());
  app.use(mongoSanitize());
  app.use(compression());

  app.setGlobalPrefix('/v1/api');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Nest MEAN')
      .setDescription('API Documentation')
      .setVersion('1.0.0')
      .setBasePath('/api')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('/v1/documentation', app, document);

  await app.listen(3000);
})();
