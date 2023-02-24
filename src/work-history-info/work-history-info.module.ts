import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkHistoryInfoController } from './work-history-info.controller';
import { WorkHistoryInfo } from './work-history-info.model';
import { WorkHistoryInfoService } from './work-history-info.service';

@Module({
  controllers: [WorkHistoryInfoController],
  providers: [WorkHistoryInfoService],
  imports: [SequelizeModule.forFeature([WorkHistoryInfo])],
  exports: [WorkHistoryInfoService],
})
export class WorkHistoryInfoModule {}
