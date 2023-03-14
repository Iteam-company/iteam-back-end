import { PricingModel } from '@/common/enums/pricing-model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsDateString,
  IsOptional,
  Length,
} from 'class-validator';
import { ProjectDeploymentStatus } from '../enums/project-deployment-status';
import { ProjectStatus } from '../enums/project-status';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends CreateProjectDto {
  @IsString({ message: 'must be a string value' })
  @Length(16, undefined, {
    message: 'needs to be more than 16 symbols',
  })
  @ApiProperty({
    example: 'shit project lorem ipsum dolor sit amet et',
    description: 'description of project',
  })
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    example: 'team consist of three PM two BE and two FE developers',
    description: 'description of team members that works on that project',
  })
  @IsString({ message: 'must be a string value' })
  @IsOptional()
  readonly teamSize: string;

  @ApiProperty({
    example: 'working with FE',
    description:
      'description of work impact on that project by our team members',
  })
  @IsString({ message: 'must be a string value' })
  @IsOptional()
  readonly ourCompanyResponsibility: string;

  @ApiProperty({
    example: PricingModel.FIXED_PRICE,
    description: `pricing model of project may be: ${Object.values(
      PricingModel,
    )}`,
  })
  @IsEnum(PricingModel, { always: true, message: 'must be of enum type' })
  @IsOptional()
  readonly pricingModel: PricingModel;

  @ApiProperty({
    example: 160.0,
    description: 'count of tracked hours within month',
  })
  @IsNumber()
  @IsOptional()
  readonly averageHoursPerMonth: number;

  @ApiProperty({
    example: 25.0,
    description: `hourly rate pricing if pricingModel === ${PricingModel.HOURLY_RATE}`,
  })
  @IsNumber()
  @IsOptional()
  readonly hourlyRate: number;

  @ApiProperty({
    example: 300.0,
    description: `fixed price cost if pricingModel === ${PricingModel.FIXED_PRICE}`,
  })
  @IsNumber()
  @IsOptional()
  readonly fixedPrice: number;

  @ApiProperty({
    example: new Date(),
    description: 'date of start deal with project',
  })
  @IsDateString()
  @IsOptional()
  readonly startDate: Date;

  @ApiProperty({
    example: new Date(),
    description: 'date of end deal with project',
  })
  @IsDateString()
  @IsOptional()
  readonly endDate: Date;

  @ApiProperty({
    example: 'project is POLNAYA HUITA',
    description: 'describe why project work ends',
  })
  @IsString()
  @IsOptional()
  readonlyendReason: string;

  @ApiProperty({
    example: ProjectStatus.ACTIVE,
    description: `project status may be: ${Object.values(ProjectStatus)}`,
  })
  @IsEnum(ProjectStatus, { always: true, message: 'not a enum value' })
  @IsOptional()
  readonly status: ProjectStatus;

  @ApiProperty({
    example: ProjectDeploymentStatus.MVP_RELEASED,
    description: `project status may be: ${Object.values(
      ProjectDeploymentStatus,
    )}`,
  })
  @IsEnum(ProjectDeploymentStatus, {
    always: true,
    message: 'not a enum value',
  })
  @IsOptional()
  readonly projectDeploymentStatus: ProjectDeploymentStatus;

  @ApiProperty({
    example: 'https://nestjs.com/',
    description: 'link to project',
  })
  @IsString()
  @IsOptional()
  readonly projectLink: string;

  @ApiProperty({
    example: 'aniah@gmail.com',
    description: 'login credentials to demo',
  })
  @IsString()
  @IsOptional()
  readonly demoCredentialsLogin: string;

  @ApiProperty({
    example: '14881337',
    description: 'password credentials to demo',
  })
  @IsString()
  @IsOptional()
  readonly demoCredentialsPassword: string;
}
