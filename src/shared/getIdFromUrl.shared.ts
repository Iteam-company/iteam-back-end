import { validate as uuidValidate } from 'uuid';

const getIdFromUrl = (url: string) => {
	const routeParts = url.split('/');
	return routeParts.find((part: string) => uuidValidate(part));
};

export default getIdFromUrl;
