import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AllowedRegistrationEmailCreationAttributes {
  email: string;
}

@Table({
  tableName: 'allowed_registration_email',
})
export class AllowedRegistrationEmail extends Model<
  AllowedRegistrationEmail,
  AllowedRegistrationEmailCreationAttributes
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
    example: 'example@gmail.com',
    description: 'allowed email',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
}
