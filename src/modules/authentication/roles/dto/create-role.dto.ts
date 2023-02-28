import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateRoleDto {
  @ApiProperty({ example: 'GUEST', description: 'role value' })
  readonly value: string;
  @ApiProperty({ example: 'some description', description: 'role value' })
  readonly description: string;
}
