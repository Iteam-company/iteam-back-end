import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client) private clientRepository: typeof Client) {}

  async createProject(dto: CreateClientDto) {
    const client = await this.clientRepository.create(dto, {
      include: { all: true },
    });

    await client.reload({ include: { all: true } });

    return client;
  }

  async getAllClients() {
    const clients = await this.clientRepository.findAll({
      include: { all: true },
    });

    return clients;
  }
}
