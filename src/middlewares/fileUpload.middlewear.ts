import multer from 'multer';

const excelStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploadsFiles/'); // file added to the public folder of the root directory
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export const fileUpload = multer({ storage: excelStorage });
