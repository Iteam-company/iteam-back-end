import { Module } from '@nestjs/common';
import { AllowedRegistrationEmailsService } from './allowed-registration-emails.service';
import { AllowedRegistrationEmailsController } from './allowed-registration-emails.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AllowedRegistrationEmail } from './allowed-registration-email.model';
import { TokensModule } from '@/tokens/tokens.module';

@Module({
  providers: [AllowedRegistrationEmailsService],
  controllers: [AllowedRegistrationEmailsController],
  imports: [
    SequelizeModule.forFeature([AllowedRegistrationEmail]),
    TokensModule,
  ],
  exports: [AllowedRegistrationEmailsService],
})
export class AllowedRegistrationEmailsModule {}
