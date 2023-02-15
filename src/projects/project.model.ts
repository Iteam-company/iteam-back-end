import { Attachment } from '@/attachments/attachment.model';
import { Client } from '@/clients/client.model';
import { PricingModel } from '@/enums/pricing-model';
import { ProjectDeploymentStatus } from '@/enums/project-deployment-status';
import { ProjectStatus } from '@/enums/project-status';
import { Technology } from '@/technologies/technology.model';
import { User } from '@/users/user.model';
import { ProjectTechnology } from '@/util-models/project-technology.model';
import { UserParticipantProject } from '@/util-models/user-participant-project.model';
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

interface ProjectCreationAttributes {
  value: string;
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
    type: DataType.TEXT,
  })
  description: string;

  @BelongsToMany(() => Technology, () => ProjectTechnology)
  technologies: Technology[];

  @ApiProperty({
    example: 'team consist of three PM two BE and two FE developers',
    description: 'description of team members that works on that project',
  })
  @Column({
    type: DataType.TEXT,
  })
  teamSize: string;

  @ApiProperty({
    example: 'working with FE',
    description:
      'description of work impact on that project by our team members',
  })
  @Column({
    type: DataType.TEXT,
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
    type: DataType.NUMBER,
  })
  averageHoursPerMonth: number;

  @ApiProperty({
    example: 25.0,
    description: `hourly rate pricing if pricingModel === ${PricingModel.HOURLY_RATE}`,
  })
  @Column({
    type: DataType.NUMBER,
  })
  hourlyRate: number;

  @ApiProperty({
    example: 300.0,
    description: `fixed price cost if pricingModel === ${PricingModel.FIXED_PRICE}`,
  })
  @Column({
    type: DataType.NUMBER,
  })
  fixedPrice: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @ApiProperty({
    type: User,
    description: 'lead of rpoject from our company',
  })
  @BelongsTo(() => User)
  mainParticipant: User;

  @BelongsToMany(() => User, () => UserParticipantProject)
  participatingInProjects: User[];

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
    type: DataType.TEXT,
  })
  endReason: string;

  @ApiProperty({
    example: ProjectStatus.ACTIVE,
    description: `project status may be: ${Object.values(ProjectStatus)}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(PricingModel),
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
  projectDeploymentStatus: ProjectStatus;

  @ApiProperty({
    example: 'https://nestjs.com/',
    description: 'link to project',
  })
  @Column({
    type: DataType.TEXT,
  })
  projectLink: string;

  @ApiProperty({
    example: 'aniah@gmail.com',
    description: 'login credentials to demo',
  })
  @Column({
    type: DataType.TEXT,
  })
  demoCredentialsLogin: string;

  @ApiProperty({
    example: '14881337',
    description: 'password credentials to demo',
  })
  @Column({
    type: DataType.TEXT,
  })
  demoCredentialsPassword: string;

  @ApiProperty({
    type: [Attachment],
    description: 'projects where user is leader',
  })
  @HasMany(() => Attachment)
  attachments: Array<Attachment>;
}
