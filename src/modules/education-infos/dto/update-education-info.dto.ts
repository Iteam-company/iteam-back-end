import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { EducationLevel } from '@/modules/education-infos/enums/education-level';

export class UpdateEducationInfoDto {
    @ApiProperty({
        example: 'some name',
        description: 'name of university'
    })
    @IsString({
        message: 'must be a string value'
    })
    @IsOptional()
    readonly universityName: string;

    @ApiProperty({
        example: new Date(),
        description: 'date of start education',
    })
    @IsDateString()
    @IsOptional()
    readonly startDate: Date;

    @ApiProperty({
        example: new Date(),
        description: 'date of end education',
    })
    @IsDateString()
    @IsOptional()
    readonly endDate: Date;

    @ApiProperty({
        example: 'computer science',
        description: 'name of specialization'
    })
    @IsString({
        message: 'must be a string value'
    })
    @IsOptional()
    readonly specialization: string;

    @ApiProperty({
        example: 'bachelor',
        description: 'name of education level' })
    @IsString({
        message: 'must be a string value'
    })
    @IsOptional()
    readonly educationLevel: EducationLevel;
}
