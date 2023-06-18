import { UserController } from '@infra/controllers';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { providers } from './user.providers';
import { IdPermissionMiddleware, UuidValidateMiddleware } from '@application/middlewares';

@Module({
  controllers: [UserController],
  providers: providers,
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidValidateMiddleware).forRoutes('user/:id')
    consumer.apply(IdPermissionMiddleware)
    .exclude({ path: 'user/:id', method: RequestMethod.GET })
    .forRoutes('user/:id')
  }
}
