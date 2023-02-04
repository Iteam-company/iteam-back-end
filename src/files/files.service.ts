import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      return 'generated url where file stored';
    } catch (error) {
      throw new HttpException(
        'Error on writing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
