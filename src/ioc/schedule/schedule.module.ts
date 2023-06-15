import { ScheduleController } from '@infra/controllers/schedule.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { VacancyModule } from '../vacancy/vacancy.module';
import { providers } from './schedule.providers';
import { UuidValidateMiddleware } from '@application/middlewares';

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

