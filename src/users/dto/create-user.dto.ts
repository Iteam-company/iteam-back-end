import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  @IsString({ message: 'must be a string value' })
  @IsEmail({}, { message: 'incorrect email template' })
  readonly email: string;
  @IsString({ message: 'must be a string value' })
  @Length(4, 16, {
    message: 'password needs to be more than 4 symbols and less than 16',
  })
  @ApiProperty({ example: 'some hashed data', description: 'user password' })
  readonly password: string;
}
