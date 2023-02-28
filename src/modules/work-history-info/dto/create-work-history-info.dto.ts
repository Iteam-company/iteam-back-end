import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateWorkHistoryInfoDto {
  @ApiProperty({ example: '228', description: 'project id' })
  readonly projectId: string;
}
