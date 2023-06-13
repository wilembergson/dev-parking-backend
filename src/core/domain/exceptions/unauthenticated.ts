import { HttpException } from '@nestjs/common';

export class Unauthenticated extends HttpException {
  constructor(message: string) {
    super(message, 401);
  }
}
