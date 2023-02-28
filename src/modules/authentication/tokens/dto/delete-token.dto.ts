import { ApiProperty } from '@nestjs/swagger';

export class RemoveTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWQiOjEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJHVUVTVCIsImRlc2NyaXB0aW9uIjoic29tZSBkZXNjcmlwdGlvbiIsImNyZWF0ZWRBdCI6IjIwMjMtMDItMDRUMTE6MDU6MTcuMTkzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMDRUMTE6MDU6MTcuMTkzWiIsIlVzZXJSb2xlIjp7ImlkIjoxLCJyb2xlSWQiOjEsInVzZXJJZCI6MX19XSwiaWF0IjoxNjc1ODU0Mzc5LCJleHAiOjE2NzU5NDA3Nzl9.93SQ9jBRw1_Y5Xj4tD-VYueCq7GhlkUjvJc3Fw_TEsc',
    description: 'encoded refresh token',
  })
  readonly token: string;
}
