import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TeamCreationAttributes {
  value: string;
  description: string;
}

@Table({
  tableName: 'teams',
})
export class Team extends Model<Team, TeamCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
}
