import { Schedule } from '@domain/entities';
import { ScheduleRepository } from '@domain/repositories';
import { ListSchedules } from '@domain/use-cases/schedule';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';

export class ListSchedulesUseCase implements ListSchedules {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: ListSchedules.Input): Promise<Schedule[]> {
    const { customerRg, finished } = input
    const listSchedules = await this.scheduleRepository.findMany();
    if (!listSchedules) throw new ScheduleNotFound();
    if (customerRg && finished !== undefined) {
      return listSchedules.filter(
        item => (item.getState().customer.getState().rg === customerRg && item.getState().finished === finished)
      )
    }
    else if (customerRg && finished === undefined) {
      return listSchedules.filter(
        item => (item.getState().customer.getState().rg === customerRg)
      )
    }
    else if (customerRg === undefined && finished !== undefined) {
      return listSchedules.filter(
        item => (item.getState().finished === finished)
      )
    }
    else {
      return listSchedules
    }
  }
}