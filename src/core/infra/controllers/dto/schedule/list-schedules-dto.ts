import { IsEmpty, Length } from "class-validator";

export class ListSchedulesDTO {
    
    customerRg: string | undefined;

    finished: boolean | undefined;
}