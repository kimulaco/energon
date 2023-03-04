import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.env.TZ = 'Asia/Tokyo';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || 4000, '0.0.0.0');
}

bootstrap();
