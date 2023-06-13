import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [AuthModule, CustomerModule, VacancyModule, ScheduleModule]
})
export class AppModule { }
