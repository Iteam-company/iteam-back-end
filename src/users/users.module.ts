import { Role } from '@/roles/role.model';
import { UserRole } from '@/util-models/user-role.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { RolesModule } from '@/roles/roles.module';
import { WorkTypesModule } from '@/work-types/work-types.module';
import { TokensModule } from '@/tokens/tokens.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole]),
    RolesModule,
    WorkTypesModule,
    TokensModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
