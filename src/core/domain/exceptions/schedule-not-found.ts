import { HttpException } from '@nestjs/common';

export class ScheduleNotFound extends HttpException {
  constructor() {
    super('Nenhum agendamendo encontrado.', 404);
  }
}
