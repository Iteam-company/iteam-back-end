import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project.model';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TokensModule } from '@/modules/authentication/tokens/tokens.module';
import { UsersModule } from '@/modules/users/users.module';
import { ClientsModule } from '@/modules/clients/clients.module';
import { TechnologiesModule } from '@/modules/technologies/technologies.module';
import { AttachmentsModule } from '@/modules/attachments/attachments.module';

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
