import { AttachmentsModule } from '@/attachments/attachments.module';
import { ClientsModule } from '@/clients/clients.module';
import { TechnologiesModule } from '@/technologies/technologies.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project.model';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([Project]),
    TokensModule,
    UsersModule,
    ClientsModule,
    TechnologiesModule,
    AttachmentsModule,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
