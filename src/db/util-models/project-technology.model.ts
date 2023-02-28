import { Project } from '@/modules/projects/project.model';
import { Technology } from '@/modules/technologies/technology.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'project_technologies',
  createdAt: false,
  updatedAt: false,
})
export class ProjectTechnology extends Model<ProjectTechnology> {
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
    allowNull: false,
  })
  projectId: number;

  @ForeignKey(() => Technology)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  technologyId: number;
}
