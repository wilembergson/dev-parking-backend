import { HttpException, HttpStatus } from '@nestjs/common';

export class UserFound extends HttpException {
  constructor() {
    super('Usuário já registrado.', HttpStatus.FORBIDDEN);
  }
}
