import { File } from '@/modules/files/file.model';
import { Project } from '@/modules/projects/project.model';
import { User } from '@/modules/users/user.model';
import { WorkHistoryInfo } from '@/modules/work-history-info/work-history-info.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface AttachmentCreationAttributes {
  comment;
}

@Table({
  tableName: 'attachments',
  createdAt: false,
  updatedAt: false,
})
export class Attachment extends Model<
  Attachment,
  AttachmentCreationAttributes
> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'there is some comment',
    description: 'comment to attach',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  comment: string;

  @ApiProperty({
    example: 1,
    description: 'file id with that file is related',
  })
  @ForeignKey(() => File)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  fileId: number;

  @ApiProperty({
    type: () => File,
    description: 'attachment with that file is related',
  })
  @BelongsTo(() => File, 'attachmentId')
  file: File;

  @ApiProperty({
    description: 'users related with that attach',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  publisherId: number;

  @ApiProperty({
    type: () => User,
    description: 'user that post that attach',
  })
  @BelongsTo(() => User, 'publisherId')
  publisher: User;

  @ApiProperty({
    description: 'user related with that attach',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @ApiProperty({
    type: () => User,
    description: 'id of user related with that attach',
  })
  @BelongsTo(() => User, 'userId')
  user: User;

  @ApiProperty({
    description: 'id of project related with that attach',
  })
  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  projectId: number;

  @ApiProperty({
    type: () => Project,
    description: 'project on that attachment is attached',
  })
  @BelongsTo(() => Project, 'projectId')
  project: Project;

  @ApiProperty({
    description: 'id of work history related with that attach',
  })
  @ForeignKey(() => WorkHistoryInfo)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  workHistoryInfoId: number;

  @ApiProperty({
    type: () => WorkHistoryInfo,
    description: 'project on that attachment is attached',
  })
  @BelongsTo(() => WorkHistoryInfo, 'workHistoryInfoId')
  workHistoryInfo: Project;
}
