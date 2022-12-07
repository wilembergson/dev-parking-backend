import { ScheduleController } from '@infra/controllers/schedule.controller';
import { Module } from '@nestjs/common';
import { CarModule } from '../car/car.module';
import { VacancyModule } from '../vacancy/vacancy.module';
import { providers } from './schedule.providers';

@Module({
  imports: [VacancyModule, CarModule],
  controllers: [ScheduleController],
  providers: providers,
})
export class ScheduleModule {}
