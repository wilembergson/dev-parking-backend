import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthMiddleware } from '@application/middlewares';

@Module({
  imports: [AuthModule, CustomerModule, VacancyModule, ScheduleModule]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('customer')
  }
}
