import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '@/modules/users/user.model';

interface WorkTypeCreationAttributes {
  value: string;
  description: string;
}

@Table({
  tableName: 'work_types',
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

  @ApiProperty({
    example: 'OFFICE',
    description: 'value of work type enum',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'mix type of work',
    description: 'description of work type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => User)
  users: Array<User>;
}
