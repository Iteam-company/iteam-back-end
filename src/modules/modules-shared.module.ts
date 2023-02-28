import { Module } from '@nestjs/common';
import { AllowedRegistrationEmailsModule } from './authentication/allowed-registration-emails/allowed-registration-emails.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { AuthModule } from './authentication/auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { EducationInfosModule } from './education-infos/education-infos.module';
import { FilesModule } from './files/files.module';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './authentication/roles/roles.module';
import { TeamsModule } from './teams/teams.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { TokensModule } from './authentication/tokens/tokens.module';
import { UsersModule } from './users/users.module';
import { WorkHistoryInfoModule } from './work-history-info/work-history-info.module';
import { WorkTypesModule } from './work-types/work-types.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    AuthModule,
    WorkTypesModule,
    FilesModule,
    TokensModule,
    TeamsModule,
    AllowedRegistrationEmailsModule,
    ProjectsModule,
    AllowedRegistrationEmailsModule,
    TechnologiesModule,
    ClientsModule,
    AttachmentsModule,
    EducationInfosModule,
    WorkHistoryInfoModule,
  ],
})
export class ModulesSharedModule {}
