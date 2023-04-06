import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@/modules/users/user.model';
import { Role } from '@/modules/authentication/roles/role.model';
import { UserRole } from '@/db/util-models/user-role.model';
import { UsersModule } from '@/modules/users/users.module';
import { TokensModule } from '@/modules/authentication/tokens/tokens.module';
import { AllowedRegistrationEmailsModule } from '@/modules/authentication/allowed-registration-emails/allowed-registration-emails.module';
import { AppSharedModule } from '@/app-shared/app-shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    TokensModule,
    AllowedRegistrationEmailsModule,
    SequelizeModule.forFeature([User, Role, UserRole]),
    AppSharedModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
