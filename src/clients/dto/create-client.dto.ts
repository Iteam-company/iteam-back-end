import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, Length } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'some name', description: 'name of project' })
  @Length(3, 20, {
    message: 'needs to be more than 3 symbols and less than 20',
  })
  @IsString({ message: 'must be a string value' })
  readonly name: string;
}
