import { CreateSchedule } from '@application/use-cases';
import { faker } from '@faker-js/faker';
import { Controller, Inject, Post } from '@nestjs/common';
import { ScheduleDependencies } from '../../../ioc/schedule';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ScheduleDependencies.CreateSheduleing)
    private readonly createScheduleService: CreateSchedule,
  ) {}

  @Post()
  async createSchedule(): Promise<void> {
    return this.createScheduleService.execute({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
      carId: faker.datatype.uuid(),
      vacancyId: faker.datatype.uuid(),
    });
  }
}
