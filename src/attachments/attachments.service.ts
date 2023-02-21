import { FilesService } from '@/files/files.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attachment } from './attachment.model';
import { CreateAttachmentsDto } from './dto/create-attachments.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel(Attachment) private attachRepository: typeof Attachment,
    private fileService: FilesService,
  ) {}

  async createAttachments(dto: CreateAttachmentsDto) {}
}
