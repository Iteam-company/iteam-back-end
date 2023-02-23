import { Attachment } from '@/attachments/attachment.model';
import { UserStatus } from '@/enums/user-status';
import { Project } from '@/projects/project.model';
import { Role } from '@/roles/role.model';
import { Technology } from '@/technologies/technology.model';
import { Token } from '@/tokens/token.model';
import { UserParticipantProject } from '@/util-models/user-participant-project.model';
import { UserRole } from '@/util-models/user-role.model';
import { UserTechnology } from '@/util-models/user-technology.model';
import { WorkType } from '@/work-types/work-type.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  HasOne,
  HasMany,
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
    example: 'etc.. I am FE developer…',
    description: 'description of position',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  positionDescription: string;

  @ApiProperty({ example: 'russian', description: 'user language' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  language: string;

  @ApiProperty({
    example: 'developer find new company',
    description: 'end of offer reason',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  endReason: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/iteam-cloud/image/upload/v1643381088/Iteam/iteam.logo_lrlwkj.jpg',
    description: 'user avatar image url',
  })
  @Default(
    'https://res.cloudinary.com/iteam-cloud/image/upload/v1643381088/Iteam/iteam.logo_lrlwkj.jpg',
  )
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  avatarUrl: string;

  @ApiProperty({ example: '+380685199434', description: 'user phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @ApiProperty({
    example: 'Kriviy Rih',
    description:
      'actual address where person located etc Kiev Obolon, Ternopil Druzba',
  })
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

  @ApiProperty({
    example: 'Uhtomskogo 13/37',
    description:
      'actual address where person located etc Kiev Obolon, Ternopil Druzba',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @ApiProperty({
    example: 'JS TS NODE.JS REACT ANGULAR',
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

  @Default(false)
  @ApiProperty({
    example: false,
    description: 'is user banned',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isBanned: boolean;

  @ApiProperty({
    example: 'za to chto dolboeb',
    description: 'user ban reason description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'date of birth',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthday: Date;

  @ApiProperty({
    example: 'https://path-to-download-cv/',
    description: 'url to download cv',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cv: string;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'date of offer',
  })
  @Default(new Date())
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'end date of offer',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @ForeignKey(() => WorkType)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  workTypeId: number;

  @ApiProperty({
    type: WorkType,
    description: 'user work type',
  })
  @BelongsTo(() => WorkType)
  workType: WorkType;

  @ApiProperty({
    type: [Role],
    description: 'user roles',
  })
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasOne(() => Token)
  token: Token;

  @ApiProperty({
    type: () => [Project],
    description: 'projects where user is leader',
  })
  @HasMany(() => Project)
  leadingInProjects: Array<Project>;

  @ApiProperty({
    type: [Project],
    description: 'participating in projects',
  })
  @BelongsToMany(() => Project, () => UserParticipantProject)
  participatingInProjects: Array<Project>;

  @ApiProperty({
    type: [Attachment],
    description: 'attachments attached with that user',
  })
  @HasMany(() => Attachment, 'userId')
  attachedAttachments: Array<Attachment>;

  @ApiProperty({
    type: [Attachment],
    description: 'published attachments by user',
  })
  @HasMany(() => Attachment, 'publisherId')
  publishedAttachments: Array<Attachment>;

  @ApiProperty({
    type: [Technology],
    description: 'technologies that user use',
  })
  @BelongsToMany(() => Technology, () => UserTechnology)
  techStack: Array<Technology>;

  @ApiProperty({
    example: UserStatus.ACTIVE,
    description: `project status may be: ${Object.values(UserStatus)}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(UserStatus),
  })
  status: UserStatus;
}

// stack: [{ type: ObjectId, ref: 'Stack' }],
// company: { type: ObjectId, ref: 'Company' },
// links: [{ type: ObjectId, ref: 'Links' }],
