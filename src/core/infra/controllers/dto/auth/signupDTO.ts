import { IsEmail, IsNotEmpty } from "class-validator";

export class SignupDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    birthdate: string;
}