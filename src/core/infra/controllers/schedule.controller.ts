import { Schedule } from '@domain/entities';
import { CreateScheduleDTO } from './dto/schedule';
import { ScheduleDependencies } from 'src/ioc/schedule';
import { Body, Controller, Get, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { CreateSchedule, FindSchedule, FindScheduleByVacancy, FinishSchedule, ListFinishedSchedules, ListSchedules } from '@domain/use-cases/schedule';
import { Response } from 'express';

@Controller('schedules')
export class ScheduleController {
  constructor(
    @Inject(ScheduleDependencies.CreateSheduleing)
    private readonly createScheduleService: CreateSchedule,
    @Inject(ScheduleDependencies.ListSchedules)
    private readonly listSchedulesService: ListSchedules,
    @Inject(ScheduleDependencies.ListFinishedSchedules)
    private readonly listFinishedSchedulesService: ListFinishedSchedules,
    @Inject(ScheduleDependencies.FinishSchedule)
    private readonly finishScheduleService: FinishSchedule,
    @Inject(ScheduleDependencies.FindSchedule)
    private readonly findScheduleService: FindSchedule,
    @Inject(ScheduleDependencies.FindScheduleByVacancy)
    private readonly findScheduleByVacancyService: FindScheduleByVacancy
    
  ) { }

  @Post()
  async createSchedule(@Res() res: Response, @Body() body: CreateScheduleDTO): Promise<void> {
    await this.createScheduleService.execute({
      vehiclePlate: body.vehiclePlate,
      pricePerHour: body.pricePerHour,
      customerId: body.customerId,
      vacancyId: body.vacancyId,
      employeeUserId: res.locals.employeeData.id
    });
    res.status(201).send({
      message: "Vaga reservada com sucesso."
    })
  }

  @Get()
  async listSchedules(@Body() body: any): Promise<(Schedule.Output.GetInformations | undefined)[]> {
    return await this.listSchedulesService.execute({
      customerRg: body.customerRg,
      finished: body.finished
    });
  }

  @Get('/finished')
  async listFinishedSchedules(): Promise<(Schedule.Output.GetInformations | undefined)[]> {
    return await this.listFinishedSchedulesService.execute();
  }

  /*@Get(':id')
  async findSchedule(@Param() param): Promise<Schedule.Output.GetInformations | null> {
    return await this.findScheduleService.execute({ id: param.id });
  }*/

  @Get('/vacancy/:id')
  async findScheduleByVacancy(@Param() param): Promise<Schedule.Output.GetInformations | null> {
    return await this.findScheduleByVacancyService.execute({ vacancyId: param.id });
  }

  @Put(':id')
  async finishSchedules(@Param() param): Promise<Schedule.Output.GetInformations> {
    return await this.finishScheduleService.execute({ id: param.id });
  }
}