import { HttpException } from '@nestjs/common';

export class InvalidUuid extends HttpException {
  constructor() {
    super('Formato do ID inválido.', 403);
  }
}
