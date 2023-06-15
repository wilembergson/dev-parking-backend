import { Schedule } from '@domain/entities';
import { CreateScheduleDTO } from './dto/schedule';
import { ScheduleDependencies } from '../../../ioc/schedule';
import { DeleteSchedule } from '@application/use-cases/delete-schedule';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateSchedule, FindSchedule, FinishSchedule, ListSchedules } from '@domain/use-cases/schedule';

@Controller('schedules')
export class ScheduleController {
  constructor(
    @Inject(ScheduleDependencies.CreateSheduleing)
    private readonly createScheduleService: CreateSchedule,
    @Inject(ScheduleDependencies.ListSchedules)
    private readonly listSchedulesService: ListSchedules,
    @Inject(ScheduleDependencies.FinishSchedule)
    private readonly finishScheduleService: FinishSchedule,
    @Inject(ScheduleDependencies.FindSchedule)
    private readonly findScheduleService: FindSchedule,
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

  @Get()
  async listSchedules(): Promise<Schedule[] | null> {
    return await this.listSchedulesService.execute();
  }

  @Get(':id')
  async findSchedule(@Param() param): Promise<Schedule | null> {
    return await this.findScheduleService.execute({ id: param.id });
  }
  
  @Put(':id')
  async finishSchedules(@Param() param): Promise<Schedule> {
    return await this.finishScheduleService.execute({ id: param.id });
  }

  @Delete(':id')
  async deleteSchedule(@Param() param): Promise<void> {
    return await this.deleteScheduleService.execute({ id: param.id });
  }
}
