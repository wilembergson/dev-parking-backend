import { Schedule } from '@domain/entities';
import { ScheduleRepository } from '@domain/repositories';
import { ListSchedules } from '@domain/use-cases/schedule';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';

export class ListSchedulesUseCase implements ListSchedules {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: ListSchedules.Input): Promise<(Schedule.Output.GetInformations | undefined)[]> {
    const { customerRg, finished } = input
    const listSchedules = await this.scheduleRepository.findMany();
    if (!listSchedules) throw new ScheduleNotFound();
    if (customerRg && finished !== undefined) {
      const list = listSchedules.map(item => {
        if (item.getState().customer.getState().rg === customerRg && item.getState().finished === finished)
          return item.getInformations()
      }
      )
      return list
    }
    else if (customerRg && finished === undefined) {
      const list = listSchedules.map(item => {
        if (item.getState().customer.getState().rg === customerRg)
          return item.getInformations()
      })
      return list
    }
    else if (customerRg === undefined && finished !== undefined) {
      const list = listSchedules.map(item => {
        if (item.getState().finished === finished) {
          return item.getInformations()
        }
      })
      return list
    }
    else {
      return listSchedules.map(item => item.getInformations())
    }
  }
}