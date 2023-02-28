import { ProjectTechnology } from '@/db/util-models/project-technology.model';
import { UserParticipantProject } from '@/db/util-models/user-participant-project.model';
import { Attachment } from '@/modules/attachments/attachment.model';
import { Client } from '@/modules/clients/client.model';
import { Technology } from '@/modules/technologies/technology.model';
import { User } from '@/modules/users/user.model';
import { WorkHistoryInfo } from '@/modules/work-history-info/work-history-info.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PricingModel } from '../../common/enums/pricing-model';
import { ProjectDeploymentStatus } from './enums/project-deployment-status';
import { ProjectStatus } from './enums/project-status';

interface ProjectCreationAttributes {
  name: string;
  description: string;
}

@Table({
  tableName: 'projects',
})
export class Project extends Model<Project, ProjectCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'some name',
    description: 'title name of project ( 3 <= length <= 20)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'this is shit project',
    description: 'description of project ( 16 <= length)',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  description: string;

  @ApiProperty({
    type: [Technology],
    description: 'technologies that using on that project',
  })
  @BelongsToMany(() => Technology, () => ProjectTechnology)
  technologies: Array<Technology>;

  @ApiProperty({
    example: 'team consist of three PM two BE and two FE developers',
    description: 'description of team members that works on that project',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  teamSize: string;

  @ApiProperty({
    example: 'working with FE',
    description:
      'description of work impact on that project by our team members',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  ourCompanyResponsibility: string;

  @ApiProperty({
    example: PricingModel.FIXED_PRICE,
    description: `pricing model of project may be: ${Object.values(
      PricingModel,
    )}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(PricingModel),
  })
  pricingModel: PricingModel;

  @ApiProperty({
    example: 160.0,
    description: 'count of tracked hours within month',
  })
  @Column({
    type: DataType.FLOAT,
  })
  averageHoursPerMonth: number;

  @ApiProperty({
    example: 25.0,
    description: `hourly rate pricing if pricingModel === ${PricingModel.HOURLY_RATE}`,
  })
  @Column({
    type: DataType.FLOAT,
  })
  hourlyRate: number;

  @ApiProperty({
    example: 300.0,
    description: `fixed price cost if pricingModel === ${PricingModel.FIXED_PRICE}`,
  })
  @Column({
    type: DataType.FLOAT,
  })
  fixedPrice: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @ApiProperty({
    type: () => User,
    description: 'lead of rpoject from our company',
  })
  @BelongsTo(() => User)
  mainParticipant: User;

  @ApiProperty({
    type: () => [User],
    description: 'users that take a part in project',
  })
  @BelongsToMany(() => User, () => UserParticipantProject)
  secondaryParticipants: Array<User>;

  @ApiProperty({
    example: new Date(),
    description: 'date of start deal with project',
  })
  @Column({
    type: DataType.DATE,
  })
  startDate: Date;

  @ApiProperty({
    example: new Date(),
    description: 'date of end deal with project',
  })
  @Column({
    type: DataType.DATE,
  })
  endDate: Date;

  @ApiProperty({
    example: 'project is POLNAYA HUITA',
    description: 'describe why project work ends',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  endReason: string;

  @ApiProperty({
    example: ProjectStatus.ACTIVE,
    description: `project status may be: ${Object.values(ProjectStatus)}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(ProjectStatus),
  })
  status: ProjectStatus;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  clientId: number;

  @ApiProperty({
    type: Client,
    description: 'client of that project',
  })
  @BelongsTo(() => Client)
  client: Client;

  @ApiProperty({
    example: ProjectDeploymentStatus.MVP_RELEASED,
    description: `project status may be: ${Object.values(
      ProjectDeploymentStatus,
    )}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(ProjectDeploymentStatus),
  })
  projectDeploymentStatus: ProjectDeploymentStatus;

  @ApiProperty({
    example: 'https://nestjs.com/',
    description: 'link to project',
  })
  @Column({
    type: DataType.TEXT('medium'),
  })
  projectLink: string;

  @ApiProperty({
    example: 'aniah@gmail.com',
    description: 'login credentials to demo',
  })
  @Column({
    type: DataType.TEXT('tiny'),
  })
  demoCredentialsLogin: string;

  @ApiProperty({
    example: '14881337',
    description: 'password credentials to demo',
  })
  @Column({
    type: DataType.TEXT('tiny'),
  })
  demoCredentialsPassword: string;

  @ApiProperty({
    type: [Attachment],
    description: 'attached attachments',
  })
  @HasMany(() => Attachment, 'projectId')
  attachedAttachments: Array<Attachment>;

  @ApiProperty({
    type: [WorkHistoryInfo],
    description: 'work histories related with that project',
  })
  @HasMany(() => WorkHistoryInfo, 'projectId')
  workHistories: Array<WorkHistoryInfo>;
}
