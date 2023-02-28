import { Technology } from '@/modules/technologies/technology.model';
import { User } from '@/modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_technologies',
  createdAt: false,
  updatedAt: false,
})
export class UserTechnology extends Model<UserTechnology> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Technology)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  technologyId: number;
}
