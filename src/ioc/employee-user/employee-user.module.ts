import { EmployeeUserController } from '@infra/controllers';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { providers, providersExporteds } from './employee-user.providers';
import { IdPermissionMiddleware, UuidValidateMiddleware } from '@application/middlewares';

@Module({
  exports: providersExporteds,
  controllers: [EmployeeUserController],
  providers: providers,
})
export class EmployeeUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidValidateMiddleware).forRoutes('user/:id')
    consumer.apply(IdPermissionMiddleware)
      .exclude({ path: 'user/:id', method: RequestMethod.GET })
      .forRoutes('user/:id')
  }
}
