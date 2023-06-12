import { HttpException } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super('Usuário não encontrado', 404);
  }
}
