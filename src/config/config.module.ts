import { EnviromentNames } from '@/common/enums/enviroment-names';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { ConfigModule } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: `.env.${getEnviroment(EnviromentNames.NODE_ENV)}`,
  isGlobal: true,
});
