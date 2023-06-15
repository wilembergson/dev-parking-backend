import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { providers } from './schedule.providers';
import { VacancyModule } from '../vacancy/vacancy.module';
import { CustomerModule } from '../customer/customer.module';
import { UuidValidateMiddleware } from '@application/middlewares';
import { ScheduleController } from '@infra/controllers/schedule.controller';

@Module({
  imports: [VacancyModule, CustomerModule],
  controllers: [ScheduleController],
  providers: providers,
})
export class ScheduleModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidValidateMiddleware).forRoutes('schedules/:id')
  }
}