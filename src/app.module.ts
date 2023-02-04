import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '@/users/users.module';
import { EnviromentNames, getEnviroment } from '@/utils/evniromentGetter';
import { User } from '@/users/users.model';
import { RolesModule } from '@/roles/roles.module';
import { Role } from '@/roles/role.model';
import { UserRole } from '@/util-models/user-role.model';
import { AuthModule } from './auth/auth.module';
import { WorkTypesModule } from './work-types/work-types.module';
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
      models: [User, Role, UserRole],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    WorkTypesModule,
  ],
  providers: [],
})
export class AppModule {}
