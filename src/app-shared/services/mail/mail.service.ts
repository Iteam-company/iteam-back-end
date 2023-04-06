import { EnviromentNames } from '@/common/enums/enviroment-names';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = createTransport({
      port: Number(getEnviroment(EnviromentNames.SMTP_PORT)),
      host: getEnviroment(EnviromentNames.SMTP_HOST),
      auth: {
        user: getEnviroment(EnviromentNames.SMTP_USER),
        pass: getEnviroment(EnviromentNames.SMTP_PASSWORD),
      },
      secure: false,
    });
  }

  async send(email: string) {
    try {
      await this.transporter.sendMail({
        from: getEnviroment(EnviromentNames.SMTP_USER),
        to: email,
        subject: `Password reset link`,
        text: '',
        html: `
          <div>
            <h1>
              Click to link for reset password
            </h1>
          </div>
        `,
      });
    } catch (error) {
      throw new HttpException(
        error.message ?? 'error on send email',
        HttpStatus.CONFLICT,
      );
    }
  }
}
