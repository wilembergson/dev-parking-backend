import { HttpException } from '@nestjs/common';

export class CustomerFound extends HttpException {
  constructor() {
    super('Cliente já cadastrado.', 403);
  }
}
