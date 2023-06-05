import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { EnviromentNames } from '@/common/enums/enviroment-names';
import { globalPipes } from '@/common/global-pipes';
import { globalMiddlewares } from '@/common/global-middlewares';
import { corsOptions } from '@/config/cors-options';

const start = async () => {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  const PORT = getEnviroment(EnviromentNames.PORT);
  const HOST_URL = getEnviroment(EnviromentNames.HOST_URL);

  globalPipes.forEach((pipe) => app.useGlobalPipes(pipe));
  globalMiddlewares.forEach((middleware) => app.use(middleware));

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
    console.log(
      `Server started at module => http://${HOST_URL ?? 'localhost'}:${
        PORT ?? 5000
      } 🚪`,
    ),
  );
};

start();
