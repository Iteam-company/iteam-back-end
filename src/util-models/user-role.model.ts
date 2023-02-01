import { Role } from '@/roles/roles.model';
import { User } from '@/users/users.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_roles',
  createdAt: false,
  updatedAt: false,
})
export class UserRole extends Model<UserRole> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  roleId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
