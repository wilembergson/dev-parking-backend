import { IsEmail, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class SignupDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @Length(9, 9)
    rg: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}