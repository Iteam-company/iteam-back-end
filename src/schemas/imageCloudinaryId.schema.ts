const imageCloudinaryId = {
	type: 'object',
	required: ['cloudinary_public_id'],
	properties: {
		cloudinary_public_id: {
			type: 'string',
		},
	},
};

export default imageCloudinaryId;
