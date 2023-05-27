import { NestFactory } from '@nestjs/core';
import { AppModule } from './ioc/app.module';

import { BaseException } from '@domain/exceptions';
import {
  ExceptionFilter,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class ExceptionHandler implements ExceptionFilter {
  catch(exception: Error): void {
    if (exception instanceof BaseException) {
      switch (exception.statusCode) {
        case 409:
          throw new ConflictException();
        case 404:
          throw new NotFoundException();
        default:
          throw exception;
      }
    }
    throw exception;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionHandler());
  await app.listen(3000);
}
bootstrap();
