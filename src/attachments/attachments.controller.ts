import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Attachment } from './attachment.model';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
// import { CreateAttachmentsDto } from './dto/create-attachments.dto';

@ApiBearerAuth()
@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private attachmentService: AttachmentsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'attachment creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Attachment })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  createAttach(
    // @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateAttachmentDto,
  ) {
    console.log({ dto });
    // return this.attachmentService.createAttach(dto);
  }

  // @Post('/create-multiple')
  // createAttachments(dto: CreateAttachmentsDto) {}
}
