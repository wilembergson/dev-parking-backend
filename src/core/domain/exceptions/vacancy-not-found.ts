import { HttpException } from '@nestjs/common';

export class VacancyNotFound extends HttpException {
  constructor() {
    super('Vaga não encontrada.', 404);
  }
}
