import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@helpers/httpExceptionFilter.helpers'
import { AuthGuard } from '@guards/auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
