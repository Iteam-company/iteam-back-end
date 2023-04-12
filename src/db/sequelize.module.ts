import { EnviromentNames } from '@/common/enums/enviroment-names';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { AllowedRegistrationEmail } from '@/modules/authentication/allowed-registration-emails/allowed-registration-email.model';
import { Attachment } from '@/modules/attachments/attachment.model';
import { Client } from '@/modules/clients/client.model';
import { EducationInfo } from '@/modules/education-infos/education-info.model';
import { File } from '@/modules/files/file.model';
import { Project } from '@/modules/projects/project.model';
import { Role } from '@/modules/authentication/roles/role.model';
import { WorkType } from '@/modules/work-types/work-type.model';
import { Technology } from '@/modules/technologies/technology.model';
import { Token } from '@/modules/authentication/tokens/token.model';
import { User } from '@/modules/users/user.model';
import { WorkHistoryInfo } from '@/modules/work-history-info/work-history-info.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectTechnology } from '@/db/util-models/project-technology.model';
import { UserParticipantProject } from '@/db/util-models/user-participant-project.model';
import { UserRole } from '@/db/util-models/user-role.model';
import { UserTechnology } from '@/db/util-models/user-technology.model';

export const sequelizeModule = SequelizeModule.forRootAsync({
  useFactory: () => ({
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
      WorkType,
    ],
    autoLoadModels: true,
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      native: true,
    },
  }),
});
