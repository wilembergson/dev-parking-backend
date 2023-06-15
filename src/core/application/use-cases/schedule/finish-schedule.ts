import { Schedule } from "@domain/entities";
import { ScheduleAlreadFinished } from "@domain/exceptions";
import { ScheduleRepository, VacancyRepository } from "@domain/repositories";
import { FinishSchedule } from "@domain/use-cases/schedule";

export class FinishScheduleUseCase implements FinishSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly vacancyRepository: VacancyRepository
    ) { }

    async execute(input: FinishSchedule.Input): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findSchedule({ id: input.id })
        if(schedule.getState().finished === true) throw new ScheduleAlreadFinished()
        schedule.setFinished()
        const vacancy = schedule.getState().vacancy
        vacancy.setOccupied(false)
        await this.vacancyRepository.save(vacancy)
        await this.scheduleRepository.update(schedule)
        return schedule
    }
}