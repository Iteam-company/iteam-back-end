import { v2 as cloudinary } from 'cloudinary';
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
} from '../../env';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_SECRET,
	api_secret: CLOUDINARY_API_KEY,
});

interface CloudinatyServiceResult {
	src: string;
	public_id: string;
	format: string;
}

const { uploader } = cloudinary;

class CloudinaryService {
	static async uploadBinary(
		binary: string,
		fileName: string
	): Promise<Partial<CloudinatyServiceResult | { error: string }>> {
		try {
			const result = await uploader.upload(binary, {
				public_id: fileName,
			});
			const { src, public_id, format } = result;

			return { src, public_id, format };
		} catch (e: any) {
			console.error(e);
			return { error: e.message };
		}
	}
}

export default CloudinaryService;
