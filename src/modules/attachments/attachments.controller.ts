import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Attachment } from './attachment.model';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { CreateAttachmentsDto } from './dto/create-attachments.dto';
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
  @UseInterceptors(FileInterceptor('file'))
  createAttach(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateAttachmentDto,
  ) {
    return this.attachmentService.createAttachment({ ...dto, file });
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAttachmentsDto,
    description: 'list of files and comments to be uploaded',
  })
  @ApiOperation({ summary: 'multiple attachments creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Attachment })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  @Post('/create-multiple')
  createAttachments(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateAttachmentsDto,
  ) {
    return this.attachmentService.createAttachments({ ...dto, files });
  }

  @ApiOperation({ summary: 'delete attachment' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  deleteFileById(@Param('id') id: string) {
    return this.attachmentService.deleteAttachmentById(id);
  }

  @ApiOperation({ summary: 'get all attachments' })
  @ApiResponse({ status: HttpStatus.OK, type: [Attachment] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllProjects() {
    return this.attachmentService.getAllAttachments();
  }
}
