import { CreateVacancy } from '@application/use-cases';
import { faker } from '@faker-js/faker';
import { Controller, Inject, Post } from '@nestjs/common';
import { VacancyDependencies } from '../../../ioc/vacancy';

@Controller('vacancy')
export class VacancyController {
  constructor(
    @Inject(VacancyDependencies.CreateVacancy)
    private readonly createVacancyService: CreateVacancy,
  ) {}

  @Post()
  async createVacancy(): Promise<void> {
    return this.createVacancyService.execute({
      localization: faker.datatype.string(),
    });
  }
}
