import { Module } from '@nestjs/common';
import { configModule } from '@/config/config.module';
import { sequelizeModule } from '@/db/sequelize.module';
import { AppSharedModule } from '@/app-shared/app-shared.module';
import { ModulesSharedModule } from '@/modules/modules-shared.module';

console.log(`.${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    configModule,
    sequelizeModule,
    AppSharedModule,
    ModulesSharedModule,
  ],
  providers: [],
})
export class AppModule {}
