import { Customer } from "@domain/entities";

export interface FindCustomer {
    execute(input: FindCustomer.Input): Promise<Customer>
}

export namespace FindCustomer {
    export type Input = {
        rg: string;
    }
}