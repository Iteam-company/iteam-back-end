import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles-auth.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { roles } from '@/constants/auth/roles';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllowedRegistrationEmailsService } from './allowed-registration-emails.service';
import { CreateAllowedRegistrationEmailDto } from './dto/create-allowed-registration-email.dto';

@ApiBearerAuth()
@ApiTags('allowed-registration-emails')
@Controller('allowed-registration-emails')
export class AllowedRegistrationEmailsController {
  constructor(
    private allowedRegistrationEmailsService: AllowedRegistrationEmailsService,
  ) {}

  @ApiOperation({ summary: 'add email to whitelist' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateAllowedRegistrationEmailDto) {
    return this.allowedRegistrationEmailsService.createAllowedEmail(dto);
  }

  @ApiOperation({ summary: 'get emails whitelist' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get()
  getAllowedEmails() {
    return this.allowedRegistrationEmailsService.getAllAllowedEmails();
  }
}
