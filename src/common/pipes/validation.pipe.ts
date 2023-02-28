import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '@/common/exceptions/validation.exception';

@Injectable()
export class ValidationBodyPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type !== 'body') {
      return value;
    }
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((error) => {
        return `${error.property}: ${Object.values(error.constraints).join(
          ', ',
        )}`;
      });
      throw new ValidationException(messages);
    }

    return value;
  }
}
