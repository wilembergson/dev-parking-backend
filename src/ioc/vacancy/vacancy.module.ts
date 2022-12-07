import { VacancyController } from '@infra/controllers';
import { Module } from '@nestjs/common';
import { providers, providersExporteds } from './vacancy.providers';

@Module({
  controllers: [VacancyController],
  providers: providers,
  exports: providersExporteds,
})
export class VacancyModule {}
