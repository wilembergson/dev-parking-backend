/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { AuthModule } from '@infra/auth/auth.module';

@Module({
  imports: [CarModule, UserModule, VacancyModule, ScheduleModule, AuthModule],
})
export class AppModule { }
