import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { EducationInfo } from './education-info.model';
import { EducationInfosService } from './education-infos.service';

@ApiTags('education info')
@Controller('education-infos')
export class EducationInfosController {
  constructor(private educationInfoService: EducationInfosService) {}

  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'education info creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: () => EducationInfo })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createEducationInfo(@Body() dto: CreateEducationInfoDto) {
    return this.educationInfoService.createEducationInfo(dto);
  }

  @ApiOperation({ summary: 'get all education infos' })
  @ApiResponse({ status: HttpStatus.OK, type: [EducationInfo] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllEducationInfo() {
    return this.educationInfoService.getAllEducationInfos();
  }

  @ApiOperation({ summary: 'delete education info' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  deleteEducationInfoById(@Param('id') id: string) {
    return this.educationInfoService.deleteEducationInfoById(id);
  }
}
