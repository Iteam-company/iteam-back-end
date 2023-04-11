import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  IsEmail,
  IsString,
  IsUrl,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { UserStatus } from '../enums/user-status';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: 'some hashed data', description: 'user password' })
  @IsString()
  @IsOptional()
  readonly password: string;

  @ApiProperty({ example: 'misha', description: 'user name' })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ example: 'kravtsov', description: 'user surname' })
  @IsString()
  @IsOptional()
  readonly surname: string;

  @ApiProperty({
    example: 'etc.. I am FE developer…',
    description: 'description of position',
  })
  @IsString()
  @IsOptional()
  readonly positionDescription: string;

  @ApiProperty({ example: 'russian', description: 'user language' })
  @IsString()
  @IsOptional()
  readonly language: string;

  @ApiProperty({
    example: 'developer find new company',
    description: 'end of offer reason',
  })
  @IsString()
  @IsOptional()
  readonly endReason: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/iteam-cloud/image/upload/v1643381088/Iteam/iteam.logo_lrlwkj.jpg',
    description: 'user avatar image url',
  })
  @IsUrl()
  @IsOptional()
  readonly avatarUrl: string;

  @ApiProperty({ example: '+380685199434', description: 'user phone number' })
  @IsPhoneNumber()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({
    example: 'Kriviy Rih',
    description:
      'actual address where person located etc Kiev Obolon, Ternopil Druzba',
  })
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiProperty({ example: '1488', description: 'user salary' })
  @IsNumber()
  @IsOptional()
  readonly salary: number;

  @ApiProperty({
    example: 'Uhtomskogo 13/37',
    description:
      'actual address where person located etc Kiev Obolon, Ternopil Druzba',
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiProperty({
    example: 'JS TS NODE.JS REACT ANGULAR',
    description: 'user skills',
  })
  @IsString()
  @IsOptional()
  readonly skills: string;

  @ApiProperty({
    example: 'short experience description',
    description: 'user experience',
  })
  @IsString()
  @IsOptional()
  readonly experience: string;

  @ApiProperty({
    example: false,
    description: 'is user banned',
  })
  @IsBoolean()
  @IsOptional()
  readonly isBanned: boolean;

  @ApiProperty({
    example: 'za to chto dolboeb',
    description: 'user ban reason description',
  })
  @IsString()
  @IsOptional()
  readonly banReason: string;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'date of birth',
  })
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @IsOptional()
  readonly birthday: Date;

  @ApiProperty({
    example: 1,
    description: 'cv id with that user is related',
  })
  @IsNumber()
  @IsOptional()
  readonly cvId: number;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'date of offer',
  })
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @IsOptional()
  readonly startDate: Date;

  @ApiProperty({
    example:
      'Sat Feb 04 2023 14:02:55 GMT+0200 (Eastern European Standard Time)',
    description: 'end date of offer',
  })
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @IsOptional()
  readonly endDate: Date;

  @ApiProperty({
    example: 1,
    description: 'work type id with that user is related',
  })
  @IsNumber()
  @IsOptional()
  readonly workTypeId: number;

  @ApiProperty({
    example: UserStatus.ARCHIVED,
    description: `project status may be: ${Object.values(UserStatus)}`,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  readonly status: UserStatus;

  @ApiProperty({
    example: 'https://www.upwork.com/',
    description: 'url to Upwork',
  })
  @IsUrl()
  @IsOptional()
  readonly upwork: string;

  @ApiProperty({
    example: 'https://github.com/',
    description: 'url to GitHub',
  })
  @IsUrl()
  @IsOptional()
  readonly github: string;

  @ApiProperty({
    example: 'https://github.com/',
    description: 'url to LinkedIn',
  })
  @IsUrl()
  @IsOptional()
  readonly linkedin: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/misha-kravtsov-6b3817239/',
    description: 'url to LinkedIn',
  })
  @IsString()
  @IsOptional()
  readonly telegramTag: string;

  @ApiProperty({
    example: 'sasha slyapik',
    description: 'individual entrepreneur name',
  })
  @IsString()
  @IsOptional()
  readonly individualEntrepreneurName: string;

  @ApiProperty({
    example: 'moskovskaya 45/1',
    description: 'individual entrepreneur address',
  })
  @IsString()
  @IsOptional()
  readonly individualEntrepreneurAddress: string;

  @ApiProperty({
    example: '2281488',
    description: 'individual entrepreneur tax number',
  })
  @IsNumber()
  @IsOptional()
  readonly individualEntrepreneurIndividualTaxNumber: number;

  @ApiProperty({
    example: 'UA23132145422321423413244',
    description: 'individual entrepreneur bank account number',
  })
  @IsString()
  @IsOptional()
  readonly individualEntrepreneurBankAccounNumber: string;

  @ApiProperty({
    example: 'UA23132145422321423413244',
    description: 'individual entrepreneur bank name',
  })
  @IsString()
  @IsOptional()
  readonly individualEntrepreneurBankName: string;

  @ApiProperty({
    example: '2281488',
    description: 'individual entrepreneur bank code',
  })
  @IsNumber()
  @IsOptional()
  readonly individualEntrepreneurBankCode: number;

  @ApiProperty({
    example: '07288098089 UKRSIBBANK ADNRIIVSKA STREET 2/12 KYIV, UKRAINE',
    description: 'individual entrepreneur bank beneficiary',
  })
  @IsString()
  @IsOptional()
  readonly individualEntrepreneurBeneficiaryBank: string;

  @ApiProperty({
    example: 'KHABUA2K',
    description: 'individual entrepreneur swift code',
  })
  @IsString()
  @IsOptional()
  readonly individualEntrepreneurSwiftCode: string;

  @ApiProperty({
    example: 'lorem ipsum dolor sit amet, consectetur adipiscing el',
    description: 'default cover letter',
  })
  @IsString()
  @IsOptional()
  readonly defaultCoverLetter: string;
}
