import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './file.model';
import { AppSharedModule } from '@/app-shared/app-shared.module';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [AppSharedModule, SequelizeModule.forFeature([File])],
})
export class FilesModule {}
