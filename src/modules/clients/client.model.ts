import { Project } from '@/modules/projects/project.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface ClientCreationAttributes {
  name: string;
}

@Table({
  tableName: 'clients',
})
export class Client extends Model<Client, ClientCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'sasha shlyapik',
    description: 'name of client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/misha-kravtsov-6b3817239/',
    description: 'link to client page',
  })
  @Column({
    type: DataType.TEXT('medium'),
  })
  link: string;

  @ApiProperty({
    example: 'Slack',
    description: 'communication type',
  })
  @Column({
    type: DataType.TEXT('medium'),
  })
  communicationType: string;

  @ApiProperty({
    type: [Project],
    description: 'projects that client owns',
  })
  @HasMany(() => Project)
  projects: Array<Project>;
}
