import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkHistoryInfoDto } from './dto/create-work-history-info.dto';
import { WorkHistoryInfo } from './work-history-info.model';

@Injectable()
export class WorkHistoryInfoService {
  constructor(
    @InjectModel(WorkHistoryInfo)
    private workHistoryInfoRepository: typeof WorkHistoryInfo,
  ) {}

  async createWorkHistoryInfo(dto: CreateWorkHistoryInfoDto) {
    return this.workHistoryInfoRepository.create(dto);
  }

  async getAllWorkHistoryInfos() {
    return this.workHistoryInfoRepository.findAll({ include: { all: true } });
  }

  async deleteWorkHistoryInfoById(id: string) {
    const educationInfo = await this.workHistoryInfoRepository.findByPk(id);

    if (educationInfo) {
      await educationInfo.destroy();
    }
  }
}
