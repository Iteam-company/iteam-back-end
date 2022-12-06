import { v2 as cloudinary } from 'cloudinary';

import Service from '.';
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
} from '../../env';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

interface CloudinatyServiceResult {
	url: string;
	public_id: string;
	format: string;
}

const { uploader } = cloudinary;

class CloudinaryService extends Service {
	static async uploadBinary(
		binary: string,
		fileName: string,
		folder: string
	): Promise<Partial<CloudinatyServiceResult | { error: string }>> {
		try {
			const result = await uploader.upload(binary, {
				public_id: fileName,
				folder,
			});

			const { url, public_id, format } = result;

			return { url, public_id, format };
		} catch (e: any) {
			console.error(e);
			return { error: e.message };
		}
	}
}

export default CloudinaryService;
