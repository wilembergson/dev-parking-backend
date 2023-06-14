import { Schedule } from '@domain/entities/schedule';
import { CreateSchedule } from '@domain/use-cases/schedule';
import { CustomerNotFound, NotAvailableVacancy, VacancyNotFound } from '@domain/exceptions';
import { CustomerRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';

export class CreateScheduleUseCase implements CreateSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly vacancyRepository: VacancyRepository,
    private readonly customerRepository: CustomerRepository,
  ) { }

  async execute(input: CreateSchedule.Input): Promise<void> {
    const customer = await this.customerRepository.findOne({
      id: input.customerId,
    });
    if (!customer) throw new CustomerNotFound();
    const vacancy = await this.vacancyRepository.findOne({
      id: input.vacancyId,
    });
    if (!vacancy) throw new VacancyNotFound();
    if (vacancy.getState().occupied) throw new NotAvailableVacancy()
    vacancy.setOccupied(true)
    const schedule = new Schedule({
      vehiclePlate: input.vehiclePlate,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    });
    schedule.addCustomer(customer);
    schedule.addVacancy(vacancy);
    await this.vacancyRepository.save(vacancy)
    await this.scheduleRepository.save(schedule);
  }
}

