import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNumber } from 'class-validator';
export class AssignUserRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role value' })
  @IsString({ message: 'must be a string value' })
  readonly value: string;
  @IsNumber({}, { message: 'must be a numeric value' })
  @ApiProperty({ example: '228', description: 'user id' })
  readonly userId: number;
}
