import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { EducationInfo } from './education-info.model';

@Injectable()
export class EducationInfosService {
  constructor(
    @InjectModel(EducationInfo)
    private educationInfoRepository: typeof EducationInfo,
  ) {}

  async createEducationInfo(dto: CreateEducationInfoDto) {
    return this.educationInfoRepository.create(dto);
  }

  async getAllEducationInfos() {
    return this.educationInfoRepository.findAll();
  }

  async deleteEducationInfoById(id: string) {
    const educationInfo = await this.educationInfoRepository.findByPk(id);

    if (educationInfo) {
      await educationInfo.destroy();
    }
  }
}
