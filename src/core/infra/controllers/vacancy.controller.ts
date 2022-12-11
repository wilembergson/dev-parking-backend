import { CreateVacancy } from '@application/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { VacancyDependencies } from '../../../ioc/vacancy';

@Controller('vacancy')
export class VacancyController {
  constructor(
    @Inject(VacancyDependencies.CreateVacancy)
    private readonly createVacancyService: CreateVacancy,
  ) {}

  @Post()
  async createVacancy(@Body() body: any): Promise<void> {
    return this.createVacancyService.execute({
      localization: body.localization,
    });
  }
}
