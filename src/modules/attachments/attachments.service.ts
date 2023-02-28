import { FilesService } from '@/modules/files/files.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attachment } from './attachment.model';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { CreateAttachmentsDto } from './dto/create-attachments.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel(Attachment) private attachRepository: typeof Attachment,
    private fileService: FilesService,
  ) {}

  async getAllAttachments() {
    return this.attachRepository.findAll({ include: { all: true } });
  }

  async createAttachment(dto: CreateAttachmentDto) {
    const { comment, file } = dto;
    const fileEntity = await this.fileService.upload(file);

    const attachmentEntity = await this.attachRepository.create({ comment });

    await attachmentEntity.$set('file', fileEntity.id);

    return attachmentEntity.reload({ include: { all: true } });
  }

  async createAttachments(dto: CreateAttachmentsDto) {
    const { files } = dto;
    const comments = JSON.parse(dto.comments);
    if (comments.length !== files.length) {
      throw new HttpException(
        'array of comments have different length than array of files',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createAttachmentsPromises = [];

    files.forEach((file, index) =>
      createAttachmentsPromises.push(
        this.createAttachment({ file, comment: comments[index] }),
      ),
    );

    return Promise.all(createAttachmentsPromises);
  }

  async deleteAttachmentById(id: string) {
    const attachmentEntity = await this.attachRepository.findByPk(id, {
      include: { all: true },
    });

    if (!attachmentEntity) {
      return;
    }
    await attachmentEntity.destroy();
    if (!attachmentEntity.file) {
      return;
    }

    return this.fileService.deleteFileByPublicId(
      attachmentEntity.file.publicId,
    );
  }
}
