import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AllowedRegistrationEmail } from './allowed-registration-email.model';
import { CreateAllowedRegistrationEmailDto } from './dto/create-allowed-registration-email.dto';

@Injectable()
export class AllowedRegistrationEmailsService {
  constructor(
    @InjectModel(AllowedRegistrationEmail)
    private allowedRegistrationEmailRepository: typeof AllowedRegistrationEmail,
  ) {}

  async createAllowedEmail(dto: CreateAllowedRegistrationEmailDto) {
    const { email } = dto;
    const alreadyExist = await this.allowedRegistrationEmailRepository.findOne({
      where: { email },
    });

    if (alreadyExist) {
      throw new HttpException('email already added', HttpStatus.BAD_REQUEST);
    }

    const createdEmail = await this.allowedRegistrationEmailRepository.create(
      dto,
    );

    return createdEmail;
  }

  async getAllAllowedEmails() {
    const allowedEmail =
      await this.allowedRegistrationEmailRepository.findAll();

    return allowedEmail;
  }
}
