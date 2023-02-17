import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './client.model';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  imports: [SequelizeModule.forFeature([Client])],
  exports: [ClientsService],
})
export class ClientsModule {}
