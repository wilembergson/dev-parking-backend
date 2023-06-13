import { Schedule } from '@domain/entities/schedule';
import { CustomerFound, VacancyNotFound } from '@domain/exceptions';
import { CustomerRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';

export class CreateSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly customerRepository: CustomerRepository,
  ) { }

  async execute(input: CreateSchedule.Input): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      id: input.vacancyId,
    });
    if (!vacancy) throw new VacancyNotFound();
    const customer = await this.customerRepository.findOne({
      id: input.customerId,
    });
    if (!customer) throw new CustomerFound();
    const schedule = new Schedule({
      vehiclePlate: input.vehiclePlate,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    });
    schedule.addCar(customer);
    schedule.addVacancy(vacancy);
    await this.scheduleRepository.save(schedule);
  }
}

namespace CreateSchedule {
  export type Input = {
    vehiclePlate: string;
    checkIn: Date;
    checkOut: Date | null;
    vacancyId: string;
    customerId: string;
  };
}
