import { Schedule } from '@domain/entities';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';
import { ScheduleRepository } from '@domain/repositories';
import { FindSchedule } from '@domain/use-cases/schedule';

export class FindScheduleUseCase implements FindSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: FindSchedule.Input): Promise<Schedule.Output.GetInformations> {
    const schedule = await this.scheduleRepository.findSchedule({
      id: input.id,
    });
    if (!schedule) throw new ScheduleNotFound();
    return schedule.getInformations();
  }
}