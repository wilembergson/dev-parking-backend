import { VacancyController } from '@infra/controllers';
import { Module } from '@nestjs/common';
import { providers, providersExporteds } from './vacancy.providers';

@Module({
  exports: providersExporteds,
  controllers: [VacancyController],
  providers: providers,
})
export class VacancyModule {}
