import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(JSON.stringify(response), HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
