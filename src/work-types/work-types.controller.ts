import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { WorkTypesService } from './work-types.service';

@ApiBearerAuth()
@ApiTags('work-types')
@Controller('work-types')
export class WorkTypesController {
  constructor(private workTypesService: WorkTypesService) {}

  @Post()
  create(@Body() dto: CreateWorkTypeDto) {
    return this.workTypesService.createWorkType(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.workTypesService.getWorkTypeByValue(value);
  }
}
