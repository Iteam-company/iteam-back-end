// import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
// import { Roles } from '@/auth/roles-auth.decorator';
// import { roles } from '@/constants/auth/roles';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  // UseGuards,
} from '@nestjs/common';
import {
  Delete,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssignAttachmentToProjectDto } from './dto/assign-attachment-to-project.dto';
import { AssignClientOfProjectDto } from './dto/assign-client-of-project.dto';
import { AssignLeadOfProjectDto } from './dto/assign-lead-of-project.dto';
import { AssignTechnologyToProjectDto } from './dto/assign-technology-to-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';
@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'project creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Project })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @ApiOperation({ summary: 'get all projects' })
  @ApiResponse({ status: HttpStatus.OK, type: [Project] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }
  @ApiOperation({ summary: 'get project by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Project })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  @ApiOperation({ summary: 'delete project' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  deleteProjectById(@Param('id') id: string) {
    return this.projectsService.deleteProjectById(id);
  }

  @ApiOperation({ summary: 'assign lead of project' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/lead-of-project')
  @HttpCode(HttpStatus.CREATED)
  assignLeadOfProject(@Body() dto: AssignLeadOfProjectDto) {
    return this.projectsService.assignLeadOfProject(dto);
  }

  @ApiOperation({ summary: 'assign participant of project' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/participant-of-project')
  @HttpCode(HttpStatus.CREATED)
  assignParticipantOfProject(@Body() dto: AssignLeadOfProjectDto) {
    return this.projectsService.assignParticipantOfProject(dto);
  }

  @ApiOperation({ summary: 'update project' })
  @ApiResponse({ status: HttpStatus.OK })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, dto);
  }

  @ApiOperation({ summary: 'assign client of project' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/client-of-project')
  @HttpCode(HttpStatus.CREATED)
  assignClientOfProject(@Body() dto: AssignClientOfProjectDto) {
    return this.projectsService.assignClientOfProject(dto);
  }

  @ApiOperation({ summary: 'assign technology of project' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/technology')
  @HttpCode(HttpStatus.CREATED)
  assignTechnologyToProject(@Body() dto: AssignTechnologyToProjectDto) {
    return this.projectsService.assignTechnologyToProject(dto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'attachment assigment' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Project })
  @HttpCode(HttpStatus.CREATED)
  @Post('assign-attachment')
  @UseInterceptors(FileInterceptor('file'))
  attachAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: AssignAttachmentToProjectDto,
  ) {
    return this.projectsService.attachAttachment({ ...dto, file });
  }
}
