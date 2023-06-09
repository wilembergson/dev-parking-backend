import { UserController } from '@infra/controllers';
import { Module } from '@nestjs/common';
import { providers } from './user.providers';

@Module({
  controllers: [UserController],
  providers: providers,
})
export class UserModule { }
