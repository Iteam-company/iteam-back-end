import { forwardRef, Module } from '@nestjs/common';
import { AllowedRegistrationEmailsService } from './allowed-registration-emails.service';
import { AllowedRegistrationEmailsController } from './allowed-registration-emails.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AllowedRegistrationEmail } from './allowed-registration-email.model';
import { ModulesSharedModule } from '@/modules/modules-shared.module';

@Module({
  providers: [AllowedRegistrationEmailsService],
  controllers: [AllowedRegistrationEmailsController],
  imports: [
    SequelizeModule.forFeature([AllowedRegistrationEmail]),
    forwardRef(() => ModulesSharedModule),
  ],
  exports: [AllowedRegistrationEmailsService],
})
export class AllowedRegistrationEmailsModule {}
