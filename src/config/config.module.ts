import { EnviromentNames } from '@/common/enums/enviroment-names';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { ConfigModule } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: `.${getEnviroment(EnviromentNames.NODE_ENV)}.env`,
  isGlobal: true,
});
