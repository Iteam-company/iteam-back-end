import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { PORT } from '@/constants/env';

const start = async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT ?? 5000, () =>
    console.log(`server started at module ${PORT ?? 5000}`),
  );
};

start();
