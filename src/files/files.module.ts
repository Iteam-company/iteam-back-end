import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './file.model';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [CloudinaryModule, SequelizeModule.forFeature([File])],
})
export class FilesModule {}
