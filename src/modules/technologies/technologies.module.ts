import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technology } from './technology.model';

@Module({
  providers: [TechnologiesService],
  controllers: [TechnologiesController],
  imports: [SequelizeModule.forFeature([Technology])],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}
