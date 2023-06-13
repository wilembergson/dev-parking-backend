export interface CreateCustomer {
    execute(input: CreateCustomer.Input): Promise<void>
}

export namespace CreateCustomer {
    export type Input = {
        name: string;
        rg: string;
    }
}