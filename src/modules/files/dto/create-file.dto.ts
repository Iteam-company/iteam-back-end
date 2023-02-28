import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: 'someFile.txt', description: 'name of file' })
  @IsString({ message: 'must be a string value' })
  readonly originalName: string;
  @ApiProperty({
    example:
      'http://res.cloudinary.com/iteam-cloud/raw/upload/v1676981611/c251d576-5838-4604-8c25-55e44f9bc264.docx',
    description: 'url for file download',
  })
  @IsString({ message: 'must be a string value' })
  readonly fileUrl: string;
  @ApiProperty({ example: 'text/html', description: 'mimetype of file' })
  @IsString({ message: 'must be a string value' })
  readonly mimetype: string;

  @ApiProperty({
    example: 'v1676988432/0d48bbd7-5468-41f9-b211-f8b203d5d8b2.txt',
    description: 'public id of file',
  })
  @IsString({ message: 'must be a string value' })
  readonly publicId: string;
}
