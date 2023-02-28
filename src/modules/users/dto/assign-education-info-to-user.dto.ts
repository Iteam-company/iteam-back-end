import { CreateEducationInfoDto } from '@/modules/education-infos/dto/create-education-info.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';
export class AssignEducationInfoToUserDto extends CreateEducationInfoDto {
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: '228', description: 'user id' })
  readonly userId: string;
}
