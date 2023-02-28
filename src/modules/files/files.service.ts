import { CloudinaryService } from '@/app-shared/services/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './file.model';

@Injectable()
export class FilesService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(File) private fileRepository: typeof File,
  ) {}

  // we  have that keys in response [file] 'fieldname' | 'originalname' | 'encoding' | 'mimetype' | 'buffer' | 'size'
  async upload(file: Express.Multer.File) {
    const { originalname, buffer, mimetype } = file;
    const fileExtension = originalname.split('.').pop();
    const { url, public_id } = await this.cloudinaryService.uploadBuffer(
      buffer,
      fileExtension,
    );
    return this.createFile({
      mimetype,
      originalName: originalname,
      fileUrl: url,
      publicId: public_id,
    });
  }

  async uploadMultipleFiles(files: Array<Express.Multer.File>) {
    return Promise.all(files.map((file) => this.upload(file)));
  }

  async createFile(dto: CreateFileDto) {
    return this.fileRepository.create(dto);
  }

  async getAllFiles() {
    return this.fileRepository.findAll({ include: { all: true } });
  }

  async deleteFileByPublicId(id: string) {
    const [deleteFromCloudResponse, deleteFromDbResponse] = await Promise.all([
      this.cloudinaryService.deleteFile(id),
      this.fileRepository.destroy({
        where: { publicId: id },
      }),
    ]);

    return { deleteFromCloudResponse, deleteFromDbResponse };
  }
}
