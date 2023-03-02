import { User } from '@/modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class UserPaginationDataResponseDto {
  @ApiProperty({ description: 'user id', type: [User] })
  readonly data: Array<User>;
  @ApiProperty({
    type: Object,
    properties: {
      first: { type: 'string' },
      last: { type: 'string' },
      prev: { type: 'string' },
      next: { type: 'string' },
    },
  })
  readonly links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  @ApiProperty({
    type: Object,
    properties: {
      currentPage: { type: 'integer' },
      lastPage: { type: 'integer' },
      perPage: { type: 'integer' },
      from: { type: 'integer' },
      to: { type: 'integer' },
      total: { type: 'integer' },
    },
  })
  readonly meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
  };
}
