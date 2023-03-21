import { roles } from '@/common/constants/auth/roles';
import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger/dist';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger/dist/decorators';
import { Roles } from '@/modules/authentication/auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '@/modules/authentication/auth/guards/jwt-auth.guard';
import { AssignAttachmentToUserDto } from './dto/assign-attachment-to-user.dto';
import { AssignCvToUserDto } from './dto/assign-cv-to-user.dto';
import { AssignEducationInfoToUserDto } from './dto/assign-education-info-to-user.dto';
import { AssignTechnologyToUserDto } from './dto/assign-technology-to-user.dto';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { AssignWorkHistoryInfoToUserDto } from './dto/assign-work-history-info-to-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUserWorkTypeDto } from './dto/set-user-work-type.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { RolesGuard } from '@/modules/authentication/auth/guards/roles.guard';
import { GetPipeType } from '@/common/enums/get-pipes-type';
import { Criteries } from './enums/criteries';
import {
  getEnviroment,
  isProd,
} from '@/common/helpers/evniroment-getter.helper';
import { EnviromentNames } from '@/common/enums/enviroment-names';
import { UserPaginationDataResponseDto } from './dto/user-pagination-data-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiQuery({
    name: 'pipe-type',
    description: `if you want to ${Object.values(GetPipeType)}`,
    required: false,
    enum: GetPipeType,
  })
  @ApiQuery({
    name: 'critery',
    description: `critery by that you want to ${Object.values(GetPipeType)}`,
    required: false,
    enum: Criteries,
  })
  @ApiQuery({
    name: 'value',
    description: `value by that you want to ${Object.values(GetPipeType)}`,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: `page`,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: `limit`,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPaginationDataResponseDto,
  })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers(
    @Query('pipe-type') action: GetPipeType,
    @Query('critery') critery: Criteries,
    @Query('value') value: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.usersService.getAllUsers(
      action,
      critery,
      value,
      page,
      limit,
      `${
        getEnviroment(EnviromentNames.HOST_URL) +
        (isProd ? '' : `:${getEnviroment(EnviromentNames.PORT)}`)
      }/users`,
    );
  }

  @ApiOperation({ summary: 'get user' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'assign role to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(roles.GUEST.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/role')
  @HttpCode(HttpStatus.CREATED)
  assignRoleToUser(@Body() dto: AssignUserRoleDto) {
    return this.usersService.assignRoleToUser(dto);
  }

  @ApiOperation({ summary: 'set work type to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(roles.GUEST.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/work-type')
  @HttpCode(HttpStatus.CREATED)
  setUserWorkType(@Body() dto: SetUserWorkTypeDto) {
    return this.usersService.setUserWorkType(dto);
  }

  @ApiOperation({ summary: 'ban user by id' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(roles.GUEST.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/ban')
  @HttpCode(HttpStatus.CREATED)
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }

  @ApiOperation({ summary: 'update project' })
  @ApiResponse({ status: HttpStatus.OK })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @ApiOperation({ summary: 'delete project' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'attachment assigment' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @HttpCode(HttpStatus.CREATED)
  @Post('attachment')
  @UseInterceptors(FileInterceptor('file'))
  attachAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: AssignAttachmentToUserDto,
  ) {
    return this.usersService.attachAttachment({ ...dto, file });
  }

  @ApiOperation({ summary: 'assign technology to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/technology')
  @HttpCode(HttpStatus.CREATED)
  assignTechnologyToUser(@Body() dto: AssignTechnologyToUserDto) {
    return this.usersService.assignTechnologyToUser(dto);
  }

  @ApiOperation({ summary: 'assign education info to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/education-info')
  @HttpCode(HttpStatus.CREATED)
  assignEducationInfoToUser(@Body() dto: AssignEducationInfoToUserDto) {
    return this.usersService.assignEducationInfoToUser(dto);
  }

  @ApiOperation({ summary: 'assign work history info to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/work-history-info')
  @HttpCode(HttpStatus.CREATED)
  assignWorkHistoryInfoToUser(@Body() dto: AssignWorkHistoryInfoToUserDto) {
    return this.usersService.assignWorkHistoryInfoToUser(dto);
  }

  @Post('/cv')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async assignCvToUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: AssignCvToUserDto,
  ) {
    return this.usersService.assignCvToUser({ ...dto, file });
  }
}
