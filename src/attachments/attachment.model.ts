import { File } from '@/files/file.model';
import { Project } from '@/projects/project.model';
import { User } from '@/users/user.model';
import { AttachmentRelation } from '@/util-models/attachment-relation.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

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

  // @ApiProperty({
  //   type: () => User,
  //   description: 'users related with that attach',
  // })
  // @BelongsTo(() => User, {})
  // users: User;

  // @ApiProperty({
  //   type: () => Project,
  //   description: 'project on that attachment is attached',
  // })
  // @BelongsTo(() => Project)
  // project: Project;
}
