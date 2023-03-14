import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { Technology } from './technology.model';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectModel(Technology) private technologyRepository: typeof Technology,
  ) {}

  async createTechnology(dto: CreateTechnologyDto) {
    return this.technologyRepository.create(dto);
  }

  async getAllTechnologies() {
    return this.technologyRepository.findAll({
      include: { all: true },
    });
  }

  async deleteTechnologyById(id: string) {
    const technology = await this.technologyRepository.findByPk(id);

    if (technology) {
      await technology.destroy();
    }
  }

  async getTechnologyById(id: string) {
    const technology = await this.technologyRepository.findByPk(id, {
      include: { all: true },
    });

    if (!technology) {
      throw new HttpException(
        `technology with id: ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return technology;
  }
}
