import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';
export class AssignCvToUserDto {
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: '228', description: 'user id' })
  readonly userId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'file to upload',
  })
  readonly file: Express.Multer.File;
}
