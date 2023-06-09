import { Module } from '@nestjs/common';
import { AuthController } from '@infra/controllers';
import { providers } from './auth.providers';

@Module({
  controllers: [AuthController],
  providers: providers,
})
export class AuthModule { }
