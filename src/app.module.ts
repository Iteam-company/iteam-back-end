import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '@/users/users.module';
import { EnviromentNames, getEnviroment } from '@/utils/evniroment-getter';
import { User } from '@/users/users.model';
import { RolesModule } from '@/roles/roles.module';
import { Role } from '@/roles/role.model';
import { UserRole } from '@/util-models/user-role.model';
import { AuthModule } from './auth/auth.module';
import { WorkTypesModule } from './work-types/work-types.module';
import { WorkType } from '@/work-types/work-types.model';
import { FilesModule } from './files/files.module';
import { TokensModule } from './tokens/tokens.module';
import { Token } from '@/tokens/token.model';
console.log(`.${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${getEnviroment(EnviromentNames.NODE_ENV)}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: getEnviroment(EnviromentNames.POSTGRES_HOST),
      port: Number(getEnviroment(EnviromentNames.POSTGRES_PORT)),
      username: getEnviroment(EnviromentNames.POSTGRES_USER),
      password: getEnviroment(EnviromentNames.POSTGRES_PASSWORD),
      database: getEnviroment(EnviromentNames.POSTGRES_DB),
      models: [User, Role, UserRole, WorkType, Token],
      autoLoadModels: true,
      protocol: 'postgres',
      dialectOptions: {
        ssl: true,
        native: true,
      },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    WorkTypesModule,
    FilesModule,
    TokensModule,
  ],
  providers: [],
})
export class AppModule {}
