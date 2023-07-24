import { Schedule } from '@domain/entities';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';
import { ScheduleRepository } from '@domain/repositories';
import { FindScheduleByVacancy } from '@domain/use-cases/schedule';

export class FindScheduleByVacancyUseCase implements FindScheduleByVacancy {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: FindScheduleByVacancy.Input): Promise<Schedule.Output.GetInformations> {
    const schedule = await this.scheduleRepository.findScheduleByVacancy({
      vacancyId: input.vacancyId,
    });
    if (!schedule) throw new ScheduleNotFound();
    return schedule.getInformations();
  }
}