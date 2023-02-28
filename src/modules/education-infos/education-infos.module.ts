import { Module } from '@nestjs/common';
import { EducationInfosService } from './education-infos.service';
import { EducationInfosController } from './education-infos.controller';
import { EducationInfo } from './education-info.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [EducationInfosService],
  controllers: [EducationInfosController],
  exports: [EducationInfosService],
  imports: [SequelizeModule.forFeature([EducationInfo])],
})
export class EducationInfosModule {}
