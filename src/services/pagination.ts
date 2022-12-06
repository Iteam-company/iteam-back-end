import { Request } from 'express';

import Service from '.';

interface ResponseInterface {
	status: number;
	totalCount: number;
	totalPages: number;
	currentPage: number;
	data: unknown[] | null;
}

class PaginationService extends Service {
	static async paginationAndSort(
		req: Request,
		someSchema: any,
		filterParams: object = {}
	): Promise<ResponseInterface> {
		try {
			const {
				sortBy,
				sortType = 1,
				limit = 10,
				page = 1,
			}: {
				sortBy?: string;
				sortType?: 1 | -1;
				limit?: number;
				page?: number;
			} = req.query;

			const totalCount = await someSchema.countDocuments();

			const totalPages =
				limit > 0 && totalCount > 0 ? Math.ceil(totalCount / limit) : 1;

			let currentPage = +page || 1;

			if (currentPage > totalPages) currentPage = totalPages;

			const offset = (currentPage - 1) * limit;

			const data = await someSchema
				.find(filterParams)
				.skip(+offset)
				.limit(+limit)
				.sort(sortBy && { [sortBy]: sortType })
				.select('-tokens');

			return {
				status: 200,
				totalCount: totalCount,
				totalPages: totalPages,
				currentPage: currentPage,
				data: [...data],
			};
		} catch (e: any) {
			console.error(e);
			return {
				status: 400,
				totalCount: 0,
				totalPages: 0,
				currentPage: 0,
				data: null,
			};
		}
	}
}

export default PaginationService;
