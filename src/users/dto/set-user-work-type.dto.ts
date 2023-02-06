import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNumber } from 'class-validator';
export class SetUserWorkTypeDto {
  @ApiProperty({ example: 'OFFICE', description: 'role value' })
  @IsString({ message: 'must be a string value' })
  readonly value: string;
  @ApiProperty({ example: '1', description: 'user id' })
  @IsNumber({}, { message: 'must be a numeric value' })
  readonly userId: number;
}
