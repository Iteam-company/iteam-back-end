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
import { EducationLevel } from './enums/education-level';

interface EducationInfoCreationAttributes {
  universityName: string;
  startDate: Date;
  endDate: Date;
  specialization: string;
  educationLevel: EducationLevel;
}

@Table({
  tableName: 'education-infos',
})
export class EducationInfo extends Model<
  EducationInfo,
  EducationInfoCreationAttributes
> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'start date of education',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'end date of education',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @ApiProperty({
    example: 'National University Imeni Tarasa Shevchenko',
    description: 'name of university',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  universityName: string;

  @ApiProperty({
    example: 'etc Nanophysics of condensed matter ',
    description: 'specialization',
  })
  @Column({
    type: DataType.TEXT('medium'),
    allowNull: true,
  })
  specialization: string;

  @ApiProperty({
    example: EducationLevel.BACHELOR,
    description: `education level of user may be: ${Object.values(
      EducationLevel,
    )}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(EducationLevel),
  })
  educationLevel: EducationLevel;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @ApiProperty({
    type: () => User,
    description: 'user that have got education',
  })
  @BelongsTo(() => User, 'userId')
  user: User;
}
