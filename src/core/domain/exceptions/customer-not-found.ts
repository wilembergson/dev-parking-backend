import { HttpException } from '@nestjs/common';

export class CustomerNotFound extends HttpException {
  constructor() {
    super('Cliente não cadastrado.', 404);
  }
}
