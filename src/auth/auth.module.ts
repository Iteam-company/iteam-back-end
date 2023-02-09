import { AllowedRegistrationEmailsModule } from '@/allowed-registration-emails/allowed-registration-emails.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    TokensModule,
    AllowedRegistrationEmailsModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
