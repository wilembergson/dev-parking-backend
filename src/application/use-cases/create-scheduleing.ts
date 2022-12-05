import { Scheduleing } from '@domain/entities';
import {
  CarRepository,
  ScheduleingRepository,
  VacancyRepository,
} from '@domain/repositories';

export class CreateScheduleing {
  constructor(
    private readonly scheduleingRepository: ScheduleingRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly carRepository: CarRepository,
  ) {}

  async execute(input: CreateScheduleing.Input): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      id: input.vacancyId,
    });
    if (!vacancy) throw new Error();
    const car = await this.carRepository.findOne({
      id: input.carId,
    });
    if (!car) throw new Error();
    const scheduleing = new Scheduleing({
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    });
    scheduleing.addCar(car);
    scheduleing.addVacancy(vacancy);
    await this.scheduleingRepository.save(scheduleing);
  }
}

namespace CreateScheduleing {
  export type Input = {
    checkIn: Date;
    checkOut: Date | null;
    vacancyId: string;
    carId: string;
  };
}
