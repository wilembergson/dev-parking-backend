import { HttpException } from '@nestjs/common';

export class NotAvailableVacancy extends HttpException {
  constructor() {
    super('Vaga ocupada.', 403);
  }
}
