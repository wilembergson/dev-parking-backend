import { Controller, Get, Inject } from '@nestjs/common';
import { ListVacancies } from '@domain/use-cases/vacancy';
import { VacancyDependencies } from 'src/ioc/vacancy';
import { Vacancy } from '@domain/entities';

@Controller('vacancy')
export class VacancyController {
  constructor(
    @Inject(VacancyDependencies.ListVacancies)
    private readonly listVacanciesService: ListVacancies,

  ) { }

  @Get()
  async listVacancies(): Promise<Vacancy.Output.GetState[]> {
    return this.listVacanciesService.execute()
  }
}
