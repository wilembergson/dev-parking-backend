import { HttpException } from '@nestjs/common';

export class ScheduleAlreadFinished extends HttpException {
  constructor() {
    super('Agendamento já finalizado.', 403);
  }
}
