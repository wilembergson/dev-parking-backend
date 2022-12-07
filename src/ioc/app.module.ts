import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
  imports: [CarModule, UserModule, VacancyModule, ScheduleModule],
})
export class AppModule {}
