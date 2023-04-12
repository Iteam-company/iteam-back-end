import { User } from '@/modules/users/user.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Op } from 'sequelize';
import { FindAndCountOptions } from 'sequelize';
import { GetPipeType } from '@/common/enums/get-pipes-type';

export const getDbEntities = async <T extends typeof User>(
  repository: T,
  pageStr = '1',
  limitStr = '2000',
  pipeType: GetPipeType,
  critery: string,
  value: string,
  url: string,
) => {
  const [page, limit] = [Number(pageStr), Number(limitStr)];

  if (isNaN(page) || isNaN(limit)) {
    throw new HttpException(
      'page or limin not a valid number',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Calculate the offset and limit for pagination
  const offset = (Number(page) - 1) * limit;

  // Create a FindAndCountOptions object to use with the Sequelize model
  const options: FindAndCountOptions<T> = {
    offset,
    limit,
    include: { all: true, nested: true },
  };

  switch (pipeType) {
    case GetPipeType.FILTER:
      options.where = {
        [critery]: {
          [Op.eq]: value,
        },
      } as any;
      break;
  }

  // Find the users that match the options
  const { rows: data, count: total } = await repository.findAndCountAll(
    options as any,
  );

  // Calculate the last page number
  const lastPage = Math.ceil(total / limit);

  // Calculate the "from" and "to" numbers for the metadata
  const from = offset + 1;
  const to = Math.min(offset + limit, total);
  //pipe-type=filter&critery=password&value=12
  // Build the links object
  const baseUrl = `${url}?pipe-type=${pipeType}&critery=${critery}&value=${value}&limit=${limit}`;
  const links = {
    first: baseUrl,
    last: `${baseUrl}&page=${lastPage}`,
    prev: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
    next: page < lastPage ? `${baseUrl}&page=${page + 1}` : null,
  };

  // Build the metadata object
  const meta = {
    currentPage: page,
    lastPage: lastPage,
    perPage: limit,
    from,
    to,
    total,
  };

  // Return the data, links, and metadata as an object
  return { data, links, meta };
};
