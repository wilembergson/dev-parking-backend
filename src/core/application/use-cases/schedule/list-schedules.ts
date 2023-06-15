import { Schedule } from '@domain/entities';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';
import { ScheduleRepository } from '@domain/repositories';
import { ListSchedules } from '@domain/use-cases/schedule';

export class ListSchedulesUseCase implements ListSchedules{
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(): Promise<Schedule[]> {
    const listSchedules = await this.scheduleRepository.findMany();
    if (!listSchedules) throw new ScheduleNotFound();
    return listSchedules;
  }
}
