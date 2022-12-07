import { CreateCar } from '@application/use-cases';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CarDependencies } from '../../../ioc/car';

@Controller('car')
export class CarController {
  constructor(
    @Inject(CarDependencies.CreateCar)
    private readonly createCarService: CreateCar,
  ) {}

  @Post()
  async createCar(@Body() body: any): Promise<void> {
    return this.createCarService.execute({
      name: body.name,
      brand: body.brand,
      plate: body.plate,
    });
  }
}
