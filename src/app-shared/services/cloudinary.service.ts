import { EnviromentNames } from '@/common/enums/enviroment-names';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: getEnviroment(EnviromentNames.CLOUD_NAME),
      api_key: getEnviroment(EnviromentNames.API_KEY),
      api_secret: getEnviroment(EnviromentNames.API_SECRET),
    });
  }
  /**
   *  const cloudinary = require('cloudinary').v2;
   *
   * // Configure Cloudinary with your API key, API secret, and cloud name
   *cloudinary.config({
   *cloud_name: 'your_cloud_name',
   *api_key: 'your_api_key',
   *api_secret: 'your_api_secret'
   *});
   * // Base64 encoded string of the file you want to upload
   *
   * const fileBase64 = '...';
   *
   * // Upload the file to Cloudinary
   *
   * cloudinary.uploader.upload('data:image/png;base64,' + fileBase64, function(error, result) {
   *  console.log(result);
   * });
   *
   *
   * In this example, you first configure Cloudinary with your API key, API secret, and cloud name.
   * Then, you create a variable fileBase64 which contains the Base64 encoded string of the file you want to upload.
   * Finally, you use the cloudinary.uploader.upload method to upload the file to Cloudinary.
   *
   *Note that in this example, we assume that the file is a PNG image.
   *If you are uploading a file in a different format, you will need to adjust the data: URI scheme accordingly
   *(e.g. data:image/jpeg;base64, for a JPEG image).
   *
   * @param file @type {string}
   */
  async uploadBuffer(file: Buffer, fileExtencion: string) {
    try {
      const uploadApiResponse = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw',
              public_id: `${uuidv4()}.${fileExtencion}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );
          stream.end(file);
        },
      );
      return uploadApiResponse;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'error on upload file',
        HttpStatus.CONFLICT,
      );
    }
  }

  async deleteFile(publicFileId: string) {
    try {
      const deleteApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
          publicFileId,
          { resource_type: 'raw' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
      });
      return deleteApiResponse;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'error on delete file',
        HttpStatus.CONFLICT,
      );
    }
  }
}
