import { PricingModel } from '@/enums/pricing-model';
import { Technology } from '@/technologies/technology.model';
import { ProjectTechnology } from '@/util-models/project-technology.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface ProjectCreationAttributes {
  value: string;
  description: string;
}

@Table({
  tableName: 'projects',
})
export class Project extends Model<Project, ProjectCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'some name',
    description: 'title name of project ( 3 <= length <= 20)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'this is shit project',
    description: 'description of project ( 16 <= length)',
  })
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @BelongsToMany(() => Technology, () => ProjectTechnology)
  technologies: Technology[];

  @ApiProperty({
    example: 'team consist of three PM two BE and two FE developers',
    description: 'description of team members that works on that project',
  })
  @Column({
    type: DataType.TEXT,
  })
  teamSize: string;

  @ApiProperty({
    example: 'working with FE',
    description:
      'description of work impact on that project by our team members',
  })
  @Column({
    type: DataType.TEXT,
  })
  ourCompanyResponsibility: string;

  @ApiProperty({
    example: PricingModel.FIXED_PRICE,
    description: `pricing model of project may be: ${Object.values(
      PricingModel,
    )}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(PricingModel),
  })
  pricingModel: PricingModel;

  @ApiProperty({
    example: 160.0,
    description: 'count of tracked hours within month',
  })
  @Column({
    type: DataType.NUMBER,
  })
  averageHoursPerMonth: number;

  @ApiProperty({
    example: 25.0,
    description: `hourly rate pricing if pricingModel === ${PricingModel.HOURLY_RATE}`,
  })
  @Column({
    type: DataType.NUMBER,
  })
  hourlyRate: number;

  @ApiProperty({
    example: 300.0,
    description: `fixed price cost if pricingModel === ${PricingModel.FIXED_PRICE}`,
  })
  @Column({
    type: DataType.NUMBER,
  })
  fixedPrice: number;

  // @ApiProperty({
  //   example: 300.0,
  //   description: `fixed price cost if pricingModel === ${PricingModel.FIXED_PRICE}`,
  // })
  // @Column({
  //   type: DataType.NUMBER,
  // })
  // fixedPrice: number;
}
