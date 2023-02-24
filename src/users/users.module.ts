import { Role } from '@/roles/role.model';
import { UserRole } from '@/util-models/user-role.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { UsersService } from './users.service';
import { RolesModule } from '@/roles/roles.module';
import { WorkTypesModule } from '@/work-types/work-types.module';
import { TokensModule } from '@/tokens/tokens.module';
import { AttachmentsModule } from '@/attachments/attachments.module';
import { TechnologiesModule } from '@/technologies/technologies.module';
import { EducationInfosModule } from '@/education-infos/education-infos.module';
import { WorkHistoryInfoModule } from '@/work-history-info/work-history-info.module';
import { FilesModule } from '@/files/files.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole]),
    RolesModule,
    WorkTypesModule,
    TokensModule,
    AttachmentsModule,
    TechnologiesModule,
    EducationInfosModule,
    WorkHistoryInfoModule,
    FilesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
