import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class CreateEducationInfoDto {
  @ApiProperty({ example: 'some name', description: 'name of project' })
  @IsString({ message: 'must be a string value' })
  readonly universityName: string;
}
