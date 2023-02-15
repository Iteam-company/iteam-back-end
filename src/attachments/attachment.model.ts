import { Project } from '@/projects/project.model';
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
  projectId: number;
  fileId: string;
  fileName: string;
  fileUrl: string;
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
    example: 1,
    description: 'project id',
  })
  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  projectId: number;

  @ApiProperty({
    type: Project,
    description: 'project on that attachment is attached',
  })
  @BelongsTo(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  project: Project;

  @ApiProperty({
    example: 'qwerty',
    description: 'id of file',
  })
  @Column({
    type: DataType.TEXT,
  })
  fileId: string;

  @ApiProperty({
    example: 'qwerty',
    description: 'name of file',
  })
  @Column({
    type: DataType.TEXT,
  })
  fileName: string;

  @ApiProperty({
    example: 'localhost/13-3213214-1/qwerty',
    description: 'url to load file',
  })
  @Column({
    type: DataType.TEXT,
  })
  fileUrl: string;

  @ApiProperty({
    example: 'localhost/minified/qwerty',
    description: 'minified image url',
  })
  @Column({
    type: DataType.TEXT,
  })
  thumbnailUrl: string;
}
