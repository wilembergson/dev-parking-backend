import { DeleteSchedule } from '@application/use-cases/delete-schedule';
import { FindSchedule } from '@application/use-cases/find-schedule';
import { Schedule } from '@domain/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ScheduleDependencies } from '../../../ioc/schedule';
import { CreateSchedule, ListSchedules } from '@domain/use-cases/schedule';
import { CreateScheduleDTO } from './dto/schedule';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ScheduleDependencies.CreateSheduleing)
    private readonly createScheduleService: CreateSchedule,
    @Inject(ScheduleDependencies.FindSchedule)
    private readonly findScheduleService: FindSchedule,
    @Inject(ScheduleDependencies.ListSchedules)
    private readonly listSchedulesService: ListSchedules,
    @Inject(ScheduleDependencies.ScheduleRepository)
    private readonly deleteScheduleService: DeleteSchedule,
  ) { }

  @Post()
  async createSchedule(@Body() body: CreateScheduleDTO): Promise<void> {
    return await this.createScheduleService.execute({
      vehiclePlate: body.vehiclePlate,
      checkIn: body.checkIn,
      pricePerHour: body.pricePerHour,
      customerId: body.customerId,
      vacancyId: body.vacancyId
    });
  }

  @Get('all')
  async listSchedules(): Promise<Schedule[] | null> {
    return await this.listSchedulesService.execute();
  }

  @Get(':id')
  async findSchedule(@Param() param): Promise<Schedule | null> {
    return await this.findScheduleService.execute({ id: param.id });
  }

  @Delete(':id')
  async deleteSchedule(@Param() param): Promise<void> {
    return await this.deleteScheduleService.execute({ id: param.id });
  }
}
