import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateAttachmentDto } from './create-attachment.dto';

export class CreateAttachmentsDto {
  @ApiProperty({ type: CreateAttachmentDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentDto)
  attaches: Array<CreateAttachmentDto>;
}
