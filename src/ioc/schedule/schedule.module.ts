import { ScheduleController } from '@infra/controllers/schedule.controller';
import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { VacancyModule } from '../vacancy/vacancy.module';
import { providers } from './schedule.providers';

@Module({
  imports: [VacancyModule, CustomerModule],
  controllers: [ScheduleController],
  providers: providers,
})
export class ScheduleModule { }
