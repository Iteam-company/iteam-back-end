import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { EnviromentNames, getEnviroment } from '@/utils/evniroment-getter';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';

@Module({
  providers: [TokensService],
  imports: [
    JwtModule.register({
      secret: getEnviroment(EnviromentNames.JWT_PRIVATE_KEY) ?? 'secret-key',
    }),
    SequelizeModule.forFeature([Token]),
  ],
  exports: [JwtModule, TokensService],
})
export class TokensModule {}
