import { CarController } from '@infra/controllers';
import { Module } from '@nestjs/common';
import { providers, providersExporteds } from './car.providers';

@Module({
  exports: providersExporteds,
  controllers: [CarController],
  providers: providers,
})
export class CarModule {}
