import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { TechnologiesService } from './technologies.service';
import { Technology } from './technology.model';

@ApiBearerAuth()
@ApiTags('technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private technologyService: TechnologiesService) {}

  @Post()
  create(@Body() dto: CreateTechnologyDto) {
    return this.technologyService.createTechnology(dto);
  }

  @ApiOperation({ summary: 'get all technologies' })
  @ApiResponse({ status: HttpStatus.OK, type: [Technology] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllRoles() {
    return this.technologyService.getAllTechnologies();
  }

  @ApiOperation({ summary: 'delete technology' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  deleteProjectById(@Param('id') id: string) {
    return this.technologyService.deleteTechnologyById(id);
  }

  @ApiOperation({ summary: 'get technology' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Get('/:id')
  getClientById(@Param('id') id: string) {
    return this.technologyService.getTechnologyById(id);
  }
}
