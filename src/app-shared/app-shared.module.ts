import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { MailService } from './services/mail/mail.service';

@Module({
  providers: [CloudinaryService, MailService],
  exports: [CloudinaryService, MailService],
})
export class AppSharedModule {}
