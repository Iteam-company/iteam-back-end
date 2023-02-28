import { User } from '@/modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface TokenCreationAttributes {
  userId: number;
  token: string;
}

@Table({
  tableName: 'tokens',
})
export class Token extends Model<Token, TokenCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWQiOjEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJHVUVTVCIsImRlc2NyaXB0aW9uIjoic29tZSBkZXNjcmlwdGlvbiIsImNyZWF0ZWRBdCI6IjIwMjMtMDItMDRUMTE6MDU6MTcuMTkzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMDRUMTE6MDU6MTcuMTkzWiIsIlVzZXJSb2xlIjp7ImlkIjoxLCJyb2xlSWQiOjEsInVzZXJJZCI6MX19LHsiaWQiOjMsInZhbHVlIjoiQURNSU4iLCJkZXNjcmlwdGlvbiI6InNvbWUgZGVzY3JpcHRpb24iLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA0VDExOjA1OjI5LjE1MVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTA0VDExOjA1OjI5LjE1MVoiLCJVc2VyUm9sZSI6eyJpZCI6Mywicm9sZUlkIjozLCJ1c2VySWQiOjF9fV0sImlhdCI6MTY3NTc2MDk1MSwiZXhwIjoxNjc1ODQ3MzUxfQ.0touayqrj2i9Gsj-9LmH_O6f1e1AcBUucujmOdbtHCc',
    description: 'encoded jwt refresh token',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  token: string;
}
