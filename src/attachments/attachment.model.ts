import { File } from '@/files/file.model';
import { Project } from '@/projects/project.model';
import { User } from '@/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
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
    type: DataType.TEXT,
  })
  comment: string;

  @ApiProperty({
    type: () => File,
    description: 'attachment with that file is related',
  })
  @HasOne(() => File)
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
}
