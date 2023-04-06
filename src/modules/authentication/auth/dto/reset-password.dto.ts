import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email whitch password will be send reset password url',
  })
  readonly email: string;
}
