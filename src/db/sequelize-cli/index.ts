import prettierOptions from '../../../.prettierrc.json';
import * as dbConfig from '@/db/sequelize-cli/config/config.json';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { generateMigration } from 'sequelize-typescript-model-migration';

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
import { ProjectTechnology } from '@/db/util-models/project-technology.model';
import { UserParticipantProject } from '@/db/util-models/user-participant-project.model';
import { UserRole } from '@/db/util-models/user-role.model';
import { UserTechnology } from '@/db/util-models/user-technology.model';

const { database, username, password } = dbConfig.development;

const sequelize: Sequelize = new Sequelize(database, username, password, {
  models: [
    AllowedRegistrationEmail,
    Attachment,
    Client,
    EducationInfo,
    File,
    Project,
    Role,
    WorkType,
    Technology,
    Token,
    User,
    WorkHistoryInfo,
    ProjectTechnology,
    UserParticipantProject,
    UserRole,
    UserTechnology,
  ],
  dialect: 'postgres',
});

generateMigration(sequelize, {
  outDir: path.join(__dirname, './migrations'),
  snapshotDir: path.join(__dirname, './snapshots'),
  migrationName: 'be-migration',
  prettierOptions,
});
