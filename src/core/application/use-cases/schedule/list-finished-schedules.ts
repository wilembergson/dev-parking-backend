import { Schedule } from '@domain/entities';
import { ScheduleRepository } from '@domain/repositories';
import { ListFinishedSchedules, ListSchedules } from '@domain/use-cases/schedule';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';

export class ListFinishedSchedulesUseCase implements ListFinishedSchedules {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(): Promise<(Schedule.Output.GetInformations | undefined)[]> {
    const listSchedules = await this.scheduleRepository.findMany();
    if (!listSchedules) throw new ScheduleNotFound();
    const result = listSchedules.filter(item => item.getInformations().checkOut)
    result.sort((a:any, b:any) => b.getInformations().checkOut - a.getInformations().checkOut)
    return result.map(item => item.getInformations())
  }
}