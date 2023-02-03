import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class AssignUserRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role value' })
  readonly value: string;
  @ApiProperty({ example: '228', description: 'user id' })
  readonly userId: number;
}
