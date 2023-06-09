import { DeleteCar } from '@application/use-cases/delete-car';
import { Car } from '@domain/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCar, FindCar } from '@application/use-cases';
import { CarDependencies } from 'src/ioc/car';

@Controller('car')
@Injectable()
export class CarController {
  constructor(
    @Inject(CarDependencies.CreateCar)
    private readonly createCarService: CreateCar,
    @Inject(CarDependencies.FindCar)
    private readonly findCarService: FindCar,
    @Inject(CarDependencies.DeleteCar)
    private readonly deleteCarService: DeleteCar,
  ) {}

  @Post()
  async createCar(@Body() body: any): Promise<void> {
    return this.createCarService.execute({
      name: body.name,
      brand: body.brand,
      plate: body.plate,
    });
  }

  @Get(':plate')
  async findCar(@Param() params): Promise<Car | null> {
    const car = await this.findCarService.execute({
      plate: params.plate,
    });
    return car;
  }

  @Delete(':id')
  async deleteCar(@Param() params): Promise<void> {
    await this.deleteCarService.execute({ id: params.id });
  }
}
