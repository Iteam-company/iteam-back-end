import { Role } from '@/roles/role.model';
import { UserRole } from '@/util-models/user-role.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'some hashed data', description: 'user password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'misha', description: 'user name' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @ApiProperty({ example: 'kravtsov', description: 'user surname' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  surname: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/iteam-cloud/image/upload/v1643381088/Iteam/iteam.logo_lrlwkj.jpg',
    description: 'user avatar image url',
  })
  @Default(
    'https://res.cloudinary.com/iteam-cloud/image/upload/v1643381088/Iteam/iteam.logo_lrlwkj.jpg',
  )
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatarUrl: string;

  @ApiProperty({ example: '+380685199434', description: 'user phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @ApiProperty({ example: 'Kriviy Rih', description: 'user city' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @ApiProperty({ example: '1488', description: 'user salary' })
  @Default(0)
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  salary: number;

  @ApiProperty({ example: 'Uhtomskogo 13/37', description: 'user address' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @ApiProperty({
    example: "JS TS NODE.JS REACT ANGULAR GOVNO!!! (it's a joke!)",
    description: 'user skills',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  skills: string;

  @ApiProperty({
    example: 'short experience description',
    description: 'user experience',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  experience: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}

// role: {
//   type: String,
//   enum: [Roles.ADMIN, Roles.HR, Roles.RECRUTIER, Roles.DEV, Roles.INTERN],
//   default: Roles.DEV,
// },
// workType: {
//   type: String,
//   enum: [WorkTypes.REMOUTE, WorkTypes.OFFICE, WorkTypes.MIX],
//   default: WorkTypes.OFFICE,
// },
// file: { type: String },
// offerDay: { type: Date, default: Date.now() },
// birthday: { type: Date },

// stack: [{ type: ObjectId, ref: 'Stack' }],
// team: [{ type: ObjectId, ref: 'Teams' }],
// company: { type: ObjectId, ref: 'Company' },
// tokens: { type: Object, default: {} },
// links: [{ type: ObjectId, ref: 'Links' }],
