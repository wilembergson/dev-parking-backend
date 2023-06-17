import { UserController } from '@infra/controllers';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { providers } from './user.providers';
import { IdPermitionMiddleware, UuidValidateMiddleware } from '@application/middlewares';

@Module({
  controllers: [UserController],
  providers: providers,
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidValidateMiddleware).forRoutes('user/:id')
    consumer.apply(IdPermitionMiddleware).forRoutes('user/:id')
  }  
}
