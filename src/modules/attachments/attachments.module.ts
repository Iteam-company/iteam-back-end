import { FilesModule } from '@/modules/files/files.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attachment } from './attachment.model';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  imports: [FilesModule, SequelizeModule.forFeature([Attachment])],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
