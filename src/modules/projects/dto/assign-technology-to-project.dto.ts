import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class AssignTechnologyToProjectDto {
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: 1488, description: 'project id' })
  readonly projectId: string;
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: 228, description: 'technology id' })
  readonly technologyId: string;
}
