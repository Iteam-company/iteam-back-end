import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class AssignClientOfProjectDto {
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: 1488, description: 'project id' })
  readonly projectId: string;
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: 228, description: 'client id' })
  readonly clientId: string;
}
