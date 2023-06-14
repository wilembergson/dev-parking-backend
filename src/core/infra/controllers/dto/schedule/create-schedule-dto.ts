import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateScheduleDTO {

    @IsNotEmpty()
    vehiclePlate: string;
    
    @IsNotEmpty()
    @IsDateString()
    checkIn: Date;
    
    @IsNotEmpty()
    @IsUUID()
    customerId: string;
    
    @IsUUID()
    @IsNotEmpty()
    vacancyId: string;
}