import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: 'some hashed data', description: 'user password' })
  readonly password: string;
}
