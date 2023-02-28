import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { UsersService } from './users.service';
import { Role } from '@/modules/authentication/roles/role.model';
import { UserRole } from '@/db/util-models/user-role.model';
import { RolesModule } from '@/modules/authentication/roles/roles.module';
import { WorkTypesModule } from '@/modules/work-types/work-types.module';
import { TokensModule } from '@/modules/authentication/tokens/tokens.module';
import { AttachmentsModule } from '@/modules/attachments/attachments.module';
import { TechnologiesModule } from '@/modules/technologies/technologies.module';
import { EducationInfosModule } from '@/modules/education-infos/education-infos.module';
import { WorkHistoryInfoModule } from '@/modules/work-history-info/work-history-info.module';
import { FilesModule } from '@/modules/files/files.module';

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
