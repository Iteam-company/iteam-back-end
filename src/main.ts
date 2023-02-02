import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { EnviromentNames, getEnviroment } from './utils/evniromentGetter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

const start = async () => {
  const app = await NestFactory.create(AppModule);
  const PORT = getEnviroment(EnviromentNames.PORT);

  const config = new DocumentBuilder()
    .setTitle('iteam-back-end')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
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
