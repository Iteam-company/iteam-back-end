import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Client } from './client.model';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @ApiOperation({ summary: 'client creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Client })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createProject(createClientDto);
  }

  @ApiOperation({ summary: 'get all clients' })
  @ApiResponse({ status: HttpStatus.OK, type: [Client] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllProjects() {
    return this.clientsService.getAllClients();
  }
}
