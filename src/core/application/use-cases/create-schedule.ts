import { Schedule } from '@domain/entities/schedule';
import { CarNotFound, VacancyNotFound } from '@domain/exceptions';
import { CarRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';

export class CreateSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly carRepository: CarRepository,
  ) {}

  async execute(input: CreateSchedule.Input): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      id: input.vacancyId,
    });
    if (!vacancy) throw new VacancyNotFound();
    const car = await this.carRepository.findOne({
      id: input.carId,
    });
    if (!car) throw new CarNotFound();
    const schedule = new Schedule({
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    });
    schedule.addCar(car);
    schedule.addVacancy(vacancy);
    await this.scheduleRepository.save(schedule);
  }
}

namespace CreateSchedule {
  export type Input = {
    checkIn: Date;
    checkOut: Date | null;
    vacancyId: string;
    carId: string;
  };
}
