import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';

const cloudinaryVariable = cloudinary.v2;

dotenv.config();

cloudinaryVariable.config({
	cloud_name: process.env.CLOUDINARY_NAME || '',
	api_key: process.env.CLOUDINARY_API_KEY || '',
	api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const config = {
	folder: !process.env.PORT ? './public/uploads' : './dist/public/uploads',
};

const removeFile = (fileName: string) => {
	return fs.unlink(config.folder + '/' + fileName, function (err: any) {
		if (err && err.code == 'ENOENT') {
			console.info("File doesn't exist, won't remove it.");
		} else if (err) {
			console.error('Error occurred while trying to remove file');
		} else {
			console.info(`removed`);
		}
	});
};

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		cb(null, config.folder);
	},
	filename: (req: any, file: any, cb: any) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const multerUpload = multer({
	storage: storage,
}).single('file');

export const filesUploaderSetup = {
	cloudinaryUploader: cloudinaryVariable.uploader,
	removeFile,
	multerUpload,
	folderToUpload: config.folder,
};
