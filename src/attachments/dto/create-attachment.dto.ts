import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttachmentDto {
  // @ApiProperty({ type: 'string', format: 'binary' })
  // // @IsNotEmpty()
  // file: Express.Multer.File;

  // @ApiPropertyOptional()
  // @ApiProperty({ type: 'string' })
  // // @IsString()
  // comment: string;
  @ApiProperty()
  // @IsNotEmpty()
  file: string;

  @ApiProperty()
  // @IsString()
  comment: string;
}
