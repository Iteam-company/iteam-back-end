import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

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

  async deleteClientById(id: string) {
    const project = await this.clientRepository.findByPk(id);

    if (project) {
      await project.destroy();
    }
  }

  async getClietById(id: string) {
    const client = await this.clientRepository.findByPk(id, {
      include: { all: true },
    });

    if (!client) {
      throw new HttpException(
        `client with id: ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return client;
  }
}
