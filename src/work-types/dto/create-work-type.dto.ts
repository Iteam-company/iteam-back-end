import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class CreateWorkTypeDto {
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: 'OFFICE', description: 'work type enum value' })
  readonly value: string;
  @IsString({ message: 'must be a string value' })
  @ApiProperty({
    example: 'some description of worktype',
    description: 'some description of worktype',
  })
  readonly description: string;
}
