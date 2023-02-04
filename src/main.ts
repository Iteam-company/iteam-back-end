import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { EnviromentNames, getEnviroment } from './utils/evniromentGetter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { globalPipes } from '@/utils/global-pipes';

const start = async () => {
  const app = await NestFactory.create(AppModule);
  const PORT = getEnviroment(EnviromentNames.PORT);

  globalPipes.forEach((pipe) => app.useGlobalPipes(pipe));

  // swagger documentation config
  const config = new DocumentBuilder()
    .setTitle('iteam-back-end')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT ?? 5000, () =>
    console.log(`server started at module ${PORT ?? 5000}`),
  );
};

start();
