import { IsNotEmpty, Length } from "class-validator";

export class CreateCustomerDTO{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Length(9, 9)
    rg: string;
}