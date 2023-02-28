import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'file to upload',
  })
  file: Express.Multer.File;

  @ApiPropertyOptional()
  @ApiProperty({ type: 'string', description: 'some comment to attached file' })
  @IsString()
  comment: string;
}
