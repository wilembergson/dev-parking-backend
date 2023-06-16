import { IsNotEmpty, IsUUID, Matches } from "class-validator";

export class CreateScheduleDTO {
    
    @IsNotEmpty()
    @Matches(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/, { message: 'Placa do veículo inválida.' })
    vehiclePlate: string;

    @IsNotEmpty()
    pricePerHour: number;
    
    @IsNotEmpty()
    @IsUUID()
    customerId: string;
    
    @IsUUID()
    @IsNotEmpty()
    vacancyId: string;
}