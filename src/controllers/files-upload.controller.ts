import { authenticate } from "@loopback/authentication";
import { inject, intercept } from "@loopback/core";
import {
  post,
  requestBody,
  RestBindings,
  Response,
  Request,
  toInterceptor,
  SchemaObject,
  del,
} from "@loopback/rest";
import { resolve } from "dns";
import imageCloudinaryId from "../schemas/imageCloudinaryId.schema";
import { filesUploaderSetup } from "../shared/filesUploader.shared";

const {multerUpload, cloudinaryUploader, removeFile} = filesUploaderSetup;

export class FilesUploadController {
  constructor(@inject(RestBindings.Http.RESPONSE) private response: Response) {}

  // @authenticate("jwt")
  @post("/upload-image")
  async uploadImage(
    @requestBody({
      description: "multipart/form-data value.",
      required: true,
      content: {
        "multipart/form-data": {
          "x-parser": "stream",
          schema: { type: "object" },
        },
      },
    })
    request: any
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      console.log("dirname", __dirname);
    multerUpload(request, {}, async (err: any) => {
      if (err) {
        console.log("error!", err);
        return reject(this.response.status(500));
      }
      const cloudinaryResponse = await cloudinaryUploader.upload(
        `./public/uploads/${request.file.filename}`,
        {
          public_id: `Iteam/${request.file.filename}`,
        }
      );
      removeFile(request.file.filename);
      return resolve(this.response.status(200).json(cloudinaryResponse));
    });
  })
  }

  @del("/remove-image")
  async removeImage (
    @requestBody({
      content: {
        'application/json': {
          schema: imageCloudinaryId as SchemaObject,
        },
      },
    })
    request: any
  ): Promise<any> {
    const { cloudinary_public_id } = request;
    if(! cloudinary_public_id) return this.response.status(400).json({msg: "Cloudinary id was not passed"});
    await cloudinaryUploader.destroy(cloudinary_public_id);
    this.response.status(204);
  }
}
