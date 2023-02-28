import { Attachment } from '@/modules/attachments/attachment.model';
import { Project } from '@/modules/projects/project.model';
import { User } from '@/modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface WorkHistoryInfoCreationAttributes {
  projectId: string;
}

@Table({
  tableName: 'work_history_infos',
})
export class WorkHistoryInfo extends Model<
  WorkHistoryInfo,
  WorkHistoryInfoCreationAttributes
> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  projectId: number;

  @ApiProperty({
    type: () => Project,
    description: 'project where user works',
  })
  @BelongsTo(() => Project, 'projectId')
  project: Project;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @ApiProperty({
    type: () => User,
    description:
      'user that works on some project that related with that entity',
  })
  @BelongsTo(() => User, 'userId')
  user: Project;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'date work on project',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'end date work on project',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @ApiProperty({
    example: 'Full stack developer',
    description: 'position of user on that project',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  positionOnProject: string;

  @ApiProperty({
    example: 'auth integration, database schema designing',
    description: 'responsibility of user on that project',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  responsibility: string;

  @ApiProperty({
    type: [Attachment],
    description: 'attached attachments',
  })
  @HasMany(() => Attachment, 'workHistoryInfoId')
  showCaseAttachments: Array<Attachment>;
}
