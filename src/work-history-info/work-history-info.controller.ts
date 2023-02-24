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
import { CreateWorkHistoryInfoDto } from './dto/create-work-history-info.dto';
import { WorkHistoryInfo } from './work-history-info.model';
import { WorkHistoryInfoService } from './work-history-info.service';

@ApiTags('work history info')
@Controller('work-history-info')
export class WorkHistoryInfoController {
  constructor(private workHistoryInfoService: WorkHistoryInfoService) {}

  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'work history info creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: () => WorkHistoryInfo })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createEducationInfo(@Body() dto: CreateWorkHistoryInfoDto) {
    return this.workHistoryInfoService.createWorkHistoryInfo(dto);
  }

  @ApiOperation({ summary: 'get all work history infos' })
  @ApiResponse({ status: HttpStatus.OK, type: [WorkHistoryInfo] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllEducationInfo() {
    return this.workHistoryInfoService.getAllWorkHistoryInfos();
  }

  @ApiOperation({ summary: 'delete work history info' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  deleteEducationInfoById(@Param('id') id: string) {
    return this.workHistoryInfoService.deleteWorkHistoryInfoById(id);
  }
}
