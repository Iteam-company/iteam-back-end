import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateAttachmentsDto {
  @IsOptional()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
      format: 'binary',
    },
    description: 'Files to upload',
  })
  @IsArray()
  files: Array<Express.Multer.File>;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: '["comment 1", "comment 2"]',
    description: 'array of comments in stringified JSON format',
  })
  @IsString()
  comments: string;
}
