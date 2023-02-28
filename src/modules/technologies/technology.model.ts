import { ProjectTechnology } from '@/db/util-models/project-technology.model';
import { UserTechnology } from '@/db/util-models/user-technology.model';
import { Project } from '@/modules/projects/project.model';
import { User } from '@/modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface TechnologyCreationAttributes {
  value: string;
  description: string;
}

@Table({
  tableName: 'technologies',
})
export class Technology extends Model<
  Technology,
  TechnologyCreationAttributes
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
    example: 'JavaScript',
    description: 'title name of technology',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'this is shit technology',
    description: 'project description',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  description: string;

  @ApiProperty({
    example: 'https://www.javascript.com/',
    description: 'url to official website',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  officialDocsHref: string;

  @ApiProperty({
    example: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    description: 'technology icon url',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  icon: string;

  @ApiProperty({
    type: [Project],
    description: 'projects where technology usings',
  })
  @BelongsToMany(() => Project, () => ProjectTechnology)
  projects: Array<Project>;

  @ApiProperty({
    type: [User],
    description: 'users that use that technology',
  })
  @BelongsToMany(() => User, () => UserTechnology)
  users: Array<Project>;
}
