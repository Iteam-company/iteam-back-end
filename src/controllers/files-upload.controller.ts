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
import imageCloudinaryId from "../schemas/imageCloudinaryId.schema";
import { filesUploaderSetup } from "../shared/filesUploader.shared";

const { multerUpload, cloudinaryUploader, removeFile, folderToUpload } =
  filesUploaderSetup;

@authenticate("jwt")
export class FilesUploadController {
  constructor(@inject(RestBindings.Http.RESPONSE) private response: Response) {}

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
    if (!request.file)
      return this.response.status(500).json({ msg: "File was not provided" });
    return new Promise<object>((resolve, reject) => {
      multerUpload(request, {}, async (err: Error) => {
        if (err) {
          return reject(this.response.status(500));
        }
        try {
          const cloudinaryResponse = await cloudinaryUploader.upload(
            `${folderToUpload}/${request.file.filename}`,
            {
              public_id: `Iteam/${request.file.filename}`,
            }
          );
          removeFile(request.file.filename);
          return resolve(this.response.status(200).json(cloudinaryResponse));
        } catch (err) {
          console.log("CATCHED ERROR", err);
        }
      });
    });
  }

  @del("/remove-image")
  async removeImage(
    @requestBody({
      content: {
        "application/json": {
          schema: imageCloudinaryId as SchemaObject,
        },
      },
    })
    request: any
  ): Promise<Response> {
    const { cloudinary_public_id } = request;
    if (!cloudinary_public_id)
      return this.response
        .status(400)
        .json({ msg: "Cloudinary id was not passed" });
    await cloudinaryUploader.destroy(cloudinary_public_id);
    return this.response.status(204);
  }
}
