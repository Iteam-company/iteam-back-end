import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '@/users/users.module';
import { EnviromentNames, getEnviroment } from '@/utils/evniroment-getter';
import { User } from '@/users/user.model';
import { RolesModule } from '@/roles/roles.module';
import { Role } from '@/roles/role.model';
import { UserRole } from '@/util-models/user-role.model';
import { AuthModule } from '@/auth/auth.module';
import { WorkTypesModule } from '@/work-types/work-types.module';
import { WorkType } from '@/work-types/work-type.model';
import { FilesModule } from '@/files/files.module';
import { TokensModule } from '@/tokens/tokens.module';
import { Token } from '@/tokens/token.model';
import { TeamsModule } from '@/teams/teams.module';
import { AllowedRegistrationEmailsModule } from './allowed-registration-emails/allowed-registration-emails.module';
import { AllowedRegistrationEmail } from '@/allowed-registration-emails/allowed-registration-email.model';
import { ProjectsModule } from '@/projects/projects.module';
import { TechnologiesModule } from '@/technologies/technologies.module';
import { ClientsModule } from '@/clients/clients.module';
import { AttachmentsModule } from '@/attachments/attachments.module';
import { Project } from '@/projects/project.model';
import { UserParticipantProject } from '@/util-models/user-participant-project.model';
import { ProjectTechnology } from '@/util-models/project-technology.model';
import { Technology } from '@/technologies/technology.model';
import { Client } from '@/clients/client.model';
import { Attachment } from '@/attachments/attachment.model';
import { File } from '@/files/file.model';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { UserTechnology } from '@/util-models/user-technology.model';
import { EducationInfo } from '@/education-infos/education-info.model';
import { EducationInfosModule } from '@/education-infos/education-infos.module';
import { WorkHistoryInfoModule } from '@/work-history-info/work-history-info.module';
import { WorkHistoryInfo } from '@/work-history-info/work-history-info.model';

console.log(`.${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${getEnviroment(EnviromentNames.NODE_ENV)}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: getEnviroment(EnviromentNames.POSTGRES_HOST),
      port: Number(getEnviroment(EnviromentNames.POSTGRES_PORT)),
      username: getEnviroment(EnviromentNames.POSTGRES_USER),
      password: getEnviroment(EnviromentNames.POSTGRES_PASSWORD),
      database: getEnviroment(EnviromentNames.POSTGRES_DB),
      models: [
        User,
        Role,
        UserRole,
        WorkType,
        Token,
        AllowedRegistrationEmail,
        Project,
        UserParticipantProject,
        ProjectTechnology,
        Technology,
        Client,
        Attachment,
        File,
        UserTechnology,
        EducationInfo,
        WorkHistoryInfo,
      ],
      autoLoadModels: true,
      protocol: 'postgres',
      dialectOptions: {
        ssl: true,
        native: true,
      },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    WorkTypesModule,
    FilesModule,
    TokensModule,
    TeamsModule,
    AllowedRegistrationEmailsModule,
    ProjectsModule,
    TechnologiesModule,
    ClientsModule,
    AttachmentsModule,
    CloudinaryModule,
    EducationInfosModule,
    WorkHistoryInfoModule,
  ],
  providers: [],
})
export class AppModule {}
