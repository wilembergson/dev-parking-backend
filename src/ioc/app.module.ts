import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [AuthModule, CarModule, VacancyModule, ScheduleModule]
})
export class AppModule { }
