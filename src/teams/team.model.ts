import { User } from '@/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface WorkTypeCreationAttributes {
  value: string;
  description: string;
}

@Table({
  tableName: 'teams',
})
export class WorkType extends Model<WorkType, WorkTypeCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
}
