import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateTechnologyDto {
  @ApiProperty({ example: 'JavaScript', description: 'technology title name' })
  readonly title: string;
  @ApiProperty({
    example: 'blya eto polnoe govno, uzay typescript bratik',
    description: 'description of technology',
  })
  readonly description: string;
}
