import { Schedule } from '@domain/entities';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';
import { ScheduleRepository } from '@domain/repositories';

export class ListSchedules {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(): Promise<Schedule[] | null> {
    let listSchedules;
    try {
      listSchedules = await this.scheduleRepository.findMany();
      if (!listSchedules) throw new ScheduleNotFound();
    } catch (error) {
      console.log(error);
    }
    return listSchedules;
  }
}
