import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  @Length(3, 20, {
    message: 'needs to be more than 3 symbols and less than 20',
  })
  @IsString({ message: 'must be a string value' })
  readonly name: string;
  @IsString({ message: 'must be a string value' })
  @Length(16, null, {
    message: 'needs to be more than 16 symbols',
  })
  @ApiProperty({ example: 'some hashed data', description: 'user password' })
  readonly description: string;
}
