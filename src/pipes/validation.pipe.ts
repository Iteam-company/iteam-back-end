import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      console.log(errors, 'errors');
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
