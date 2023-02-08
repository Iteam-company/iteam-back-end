import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateAllowedRegistrationEmailDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'allowed emails' })
  readonly email: string;
}
