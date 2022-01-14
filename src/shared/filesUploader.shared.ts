import { readdirSync } from "fs";

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const config = {
  folder: !process.env.PORT ? "./public/uploads" : "./dist/public/uploads",
};

fs.access(config.folder, (err: any) => {
  console.log(`Directory ${err ? 'does not exist' : 'exists'}`);
});

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

process.env.PORT && console.log("LISTED DIRS", getDirectories("./dist"));

console.log("dirname from shared->filesUploader", __dirname,  );



const removeFile = (fileName: string) => {
  console.log("FileName", fileName);

  return fs.unlink(config.folder + fileName, function (err: any) {
    if (err && err.code == "ENOENT") {
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });
};

console.log("paths", require.main?.paths, __dirname );

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, config.folder);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const multerUpload = multer({
  storage: storage,
}).single("file");


export const filesUploaderSetup = {cloudinaryUploader :cloudinary.uploader, removeFile, multerUpload, folderToUpload: config.folder };

