/* eslint-disable prettier/prettier */
import { CreateVacancy } from '@application/use-cases';
import { DeleteVacancy } from '@application/use-cases/delete-vacancy';
import { FindVacancy } from '@application/use-cases/find-vacancy';
import { UpdateVacancy } from '@application/use-cases/update-vacancy';
import { Vacancy } from '@domain/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VacancyDependencies } from '../../../ioc/vacancy';

@Controller('vacancy')
export class VacancyController {
  constructor(
    @Inject(VacancyDependencies.CreateVacancy)
    private readonly createVacancyService: CreateVacancy,
    @Inject(VacancyDependencies.FindVacancy)
    private readonly findVacancyService: FindVacancy,
    @Inject(VacancyDependencies.DeleteVacancy)
    private readonly deleteVacancyService: DeleteVacancy,
    @Inject(VacancyDependencies.UpdateVacancy)
    private readonly updateVacancyService: UpdateVacancy,
  ) { }

  @Post()
  async createVacancy(@Body() body: any): Promise<void> {
    return this.createVacancyService.execute({
      localization: body.localization,
    });
  }

  @Get(':id')
  async findVacancy(@Param() param): Promise<Vacancy | null> {
    return this.findVacancyService.execute({
      id: param.id,
    });
  }

  @Delete(':id')
  async deleteVacancy(@Param() param): Promise<void> {
    return this.deleteVacancyService.execute({
      id: param.id,
    });
  }

  @Put(':id')
  async updateVacancy(@Param() param, @Body() body: any): Promise<void> {
    return this.updateVacancyService.execute(param.id, {
      localization: body.localization,
    });
  }
}
