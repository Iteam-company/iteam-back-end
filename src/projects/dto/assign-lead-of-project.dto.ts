import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNumber } from 'class-validator';
export class AssignLeadOfProjectDto {
  @IsNumber({}, { message: 'must be a numeric value' })
  @ApiProperty({ example: 1488, description: 'project id' })
  readonly projectId: number;
  @IsNumber({}, { message: 'must be a numeric value' })
  @ApiProperty({ example: 228, description: 'user id' })
  readonly userId: number;
}
