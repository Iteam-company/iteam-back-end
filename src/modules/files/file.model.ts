import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
    type: DataType.TEXT('long'),
  })
  originalName: string;

  @ApiProperty({
    example: 'localhost/13-3213214-1/qwerty',
    description: 'url to load file',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  fileUrl: string;

  @ApiProperty({
    example: 'text/plain',
    description: 'mime type of file',
  })
  @Column({
    type: DataType.TEXT('medium'),
  })
  mimetype: string;

  @ApiProperty({
    example: 'v1676988432/0d48bbd7-5468-41f9-b211-f8b203d5d8b2.txt',
    description: 'public id of file',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  publicId: string;
}
