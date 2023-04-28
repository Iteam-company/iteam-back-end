import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { EducationInfo } from './education-info.model';
import { UpdateEducationInfoDto } from '@/modules/education-infos/dto/update-education-info.dto';

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

  async updateEducationInfo(educationId: string, dto: UpdateEducationInfoDto) {
    const education = await this.educationInfoRepository.findByPk(educationId);

    if (!educationId) {
      throw new HttpException(
          `education with id: ${educationId} not exist`,
          HttpStatus.BAD_REQUEST,
      );
    }

    const updatedEducation = await education.update(dto);

    await updatedEducation.reload({ include: { all: true } });

    return updatedEducation;
  }

  async deleteEducationInfoById(id: string) {
    const educationInfo = await this.educationInfoRepository.findByPk(id);

    if (educationInfo) {
      await educationInfo.destroy();
    }
  }
}
