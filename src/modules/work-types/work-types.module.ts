import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTypesController } from './work-types.controller';
import { WorkType } from './work-type.model';
import { WorkTypesService } from './work-types.service';
import { User } from '@/modules/users/user.model';

@Module({
  controllers: [WorkTypesController],
  providers: [WorkTypesService],
  imports: [SequelizeModule.forFeature([User, WorkType])],
  exports: [WorkTypesService],
})
export class WorkTypesModule {}
