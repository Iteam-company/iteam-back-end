import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsDateString, IsString } from 'class-validator';
import { EducationLevel } from '@/modules/education-infos/enums/education-level';

export class CreateEducationInfoDto {
  @ApiProperty({
    example: 'some name',
    description: 'name of university'
  })
  @IsString({
    message: 'must be a string value'
  })
  readonly universityName: string;

  @ApiProperty({
    example: new Date(),
    description: 'date of start education',
  })
  @IsDateString()
  readonly startDate: Date;

  @ApiProperty({
    example: new Date(),
    description: 'date of end education',
  })
  @IsDateString()
  readonly endDate: Date;

  @ApiProperty({
    example: 'computer science',
    description: 'name of specialization'
  })
  @IsString({
    message: 'must be a string value'
  })
  readonly specialization: string;

  @ApiProperty({
    example: 'bachelor',
    description: 'name of education level' })
  @IsString({
    message: 'must be a string value'
  })
  readonly educationLevel: EducationLevel;
}
