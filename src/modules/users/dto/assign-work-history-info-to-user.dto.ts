import { CreateWorkHistoryInfoDto } from '@/modules/work-history-info/dto/create-work-history-info.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class AssignWorkHistoryInfoToUserDto extends CreateWorkHistoryInfoDto {
  @ApiProperty({ example: '228', description: 'user id' })
  readonly userId: string;
}
