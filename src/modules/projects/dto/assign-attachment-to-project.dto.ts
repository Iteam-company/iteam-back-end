import { CreateAttachmentDto } from '@/modules/attachments/dto/create-attachment.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';
export class AssignAttachmentToProjectDto extends CreateAttachmentDto {
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: '228', description: 'project id' })
  readonly projectId: string;

  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: '1337', description: 'publisher id' })
  readonly publisherId: number;
}
