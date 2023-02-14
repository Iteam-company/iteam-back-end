import { Project } from '@/projects/project.model';
import { User } from '@/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_leads_project',
  createdAt: false,
  updatedAt: false,
})
export class UserLeadProject extends Model<UserLeadProject> {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
