import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { providers } from './schedule.providers';
import { VacancyModule } from '../vacancy/vacancy.module';
import { CustomerModule } from '../customer/customer.module';
import { UuidValidateMiddleware } from '@application/middlewares';
import { ScheduleController } from '@infra/controllers/schedule.controller';
import { EmployeeUserModule } from '../employee-user/employee-user.module';

@Module({
  imports: [VacancyModule, CustomerModule, EmployeeUserModule],
  controllers: [ScheduleController],
  providers: providers,
})
export class ScheduleModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidValidateMiddleware).forRoutes('schedules/vacancy/:id')
  }
}