import { HttpException } from '@nestjs/common';

export class WrongPassword extends HttpException {
  constructor() {
    super('Senha não compatível.', 401);
  }
}
