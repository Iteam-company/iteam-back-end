import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { WorkType } from './work-type.model';

@Injectable()
export class WorkTypesService {
  constructor(
    @InjectModel(WorkType) private workTypeRepository: typeof WorkType,
  ) {}
  async createWorkType(dto: CreateWorkTypeDto) {
    const role = await this.workTypeRepository.create(dto);

    return role;
  }

  async getWorkTypeByValue(value: string) {
    const role = await this.workTypeRepository.findOne({ where: { value } });

    return role;
  }
}
