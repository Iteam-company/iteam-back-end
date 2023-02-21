import { Attachment } from '@/attachments/attachment.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface FileCreationAttributes {
  originalName: string;
  fileUrl: string;
  mimetype: string;
  publicId: string;
}

@Table({
  tableName: 'files',
})
export class File extends Model<File, FileCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'dart.txt',
    description: 'original name of file',
  })
  @Column({
    type: DataType.TEXT,
  })
  originalName: string;

  @ApiProperty({
    example: 'localhost/13-3213214-1/qwerty',
    description: 'url to load file',
  })
  @Column({
    type: DataType.TEXT,
  })
  fileUrl: string;

  @ApiProperty({
    example: 'text/plain',
    description: 'mime type of file',
  })
  @Column({
    type: DataType.TEXT,
  })
  mimetype: string;

  @ApiProperty({
    example: 1,
    description: 'attachment id with that file is related',
  })
  @ForeignKey(() => Attachment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  attachmentId: number;

  @ApiProperty({
    type: () => Attachment,
    description: 'attachment with that file is related',
  })
  @BelongsTo(() => Attachment)
  attachment: Attachment;

  @ApiProperty({
    example: 'v1676988432/0d48bbd7-5468-41f9-b211-f8b203d5d8b2.txt',
    description: 'public id of file',
  })
  @Column({
    type: DataType.TEXT,
  })
  publicId: string;
}
