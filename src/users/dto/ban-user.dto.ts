import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class BanUserDto {
  @ApiProperty({ example: '228', description: 'user id' })
  readonly userId: number;
  @ApiProperty({ example: 'kick from company', description: 'reason of ban' })
  readonly banReason: string;
}
