import { Attachment } from '@/modules/attachments/attachment.model';
import { EducationInfo } from '@/modules/education-infos/education-info.model';
import { UserStatus } from './enums/user-status';
import { File } from '@/modules/files/file.model';
import { Project } from '@/modules/projects/project.model';
import { Role } from '@/modules/authentication/roles/role.model';
import { Technology } from '@/modules/technologies/technology.model';
import { Token } from '@/modules/authentication/tokens/token.model';
import { WorkHistoryInfo } from '@/modules/work-history-info/work-history-info.model';
import { WorkType } from '@/modules/work-types/work-type.model';
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
import { UserRole } from '@/db/util-models/user-role.model';
import { UserParticipantProject } from '@/db/util-models/user-participant-project.model';
import { UserTechnology } from '@/db/util-models/user-technology.model';

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
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  skills: string;

  @ApiProperty({
    example: 'short experience description',
    description: 'user experience',
  })
  @Column({
    type: DataType.TEXT('long'),
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
    example: 1,
    description: 'cv id with that user is related',
  })
  @ForeignKey(() => File)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  cvId: number;

  @ApiProperty({
    type: () => File,
    description: 'cv with that user is related',
  })
  @BelongsTo(() => File, 'cvId')
  cv: File;

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

  @Default(UserStatus.UNARCHIVED)
  @ApiProperty({
    example: UserStatus.ARCHIVED,
    description: `project status may be: ${Object.values(UserStatus)}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(UserStatus),
  })
  status: UserStatus;

  @ApiProperty({
    type: [EducationInfo],
    description: 'educations by achived by user',
  })
  @HasMany(() => EducationInfo, 'userId')
  educationInfo: Array<User>;

  @ApiProperty({
    example: 'https://www.upwork.com/',
    description: 'url to Upwork',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  upwork: string;

  @ApiProperty({
    example: 'https://github.com/',
    description: 'url to GitHub',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  github: string;

  @ApiProperty({
    example: 'https://github.com/',
    description: 'url to LinkedIn',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  linkedin: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/misha-kravtsov-6b3817239/',
    description: 'url to LinkedIn',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  telegramTag: string;

  @ApiProperty({
    example: 'sasha slyapik',
    description: 'individual entrepreneur name',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  individualEntrepreneurName: string;

  @ApiProperty({
    example: 'moskovskaya 45/1',
    description: 'individual entrepreneur address',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  individualEntrepreneurAddress: string;

  @ApiProperty({
    example: '2281488',
    description: 'individual entrepreneur tax number',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  individualEntrepreneurIndividualTaxNumber: number;

  @ApiProperty({
    example: 'UA23132145422321423413244',
    description: 'individual entrepreneur bank account number',
  })
  @Column({
    type: DataType.TEXT('medium'),
    allowNull: true,
  })
  individualEntrepreneurBankAccounNumber: string;

  @ApiProperty({
    example: 'UA23132145422321423413244',
    description: 'individual entrepreneur bank name',
  })
  @Column({
    type: DataType.TEXT('medium'),
    allowNull: true,
  })
  individualEntrepreneurBankName: string;

  @ApiProperty({
    example: '2281488',
    description: 'individual entrepreneur bank code',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  individualEntrepreneurBankCode: number;

  @ApiProperty({
    example: '07288098089 UKRSIBBANK ADNRIIVSKA STREET 2/12 KYIV, UKRAINE',
    description: 'individual entrepreneur bank beneficiary',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  individualEntrepreneurBeneficiaryBank: string;

  @ApiProperty({
    example: 'KHABUA2K',
    description: 'individual entrepreneur swift code',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  individualEntrepreneurSwiftCode: string;

  @ApiProperty({
    type: [WorkHistoryInfo],
    description: 'attachments attached with that user',
  })
  @HasMany(() => WorkHistoryInfo, 'userId')
  workHistory: Array<WorkHistoryInfo>;

  @ApiProperty({
    example: 'lorem ipsum dolor sit amet, consectetur adipiscing el',
    description: 'default cover letter',
  })
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  defaultCoverLetter: string;
}
