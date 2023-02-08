import { User } from '@/users/user.model';
import { UserRole } from '@/util-models/user-role.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({
  tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'GUEST',
    description: 'value of role',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'that is base role',
    description: 'description of role',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
