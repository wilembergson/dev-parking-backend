import { CreateSchedule } from '@application/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ScheduleDependencies } from '../../../ioc/schedule';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ScheduleDependencies.CreateSheduleing)
    private readonly createScheduleService: CreateSchedule,
  ) {}

  @Post()
  async createSchedule(@Body() body: any): Promise<void> {
    return this.createScheduleService.execute({
      checkIn: body.checkIn,
      checkOut: body.checkout,
      carId: body.carId,
      vacancyId: body.vacancyId,
    });
  }
}
