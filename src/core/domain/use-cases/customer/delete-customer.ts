export interface DeleteCustomer {
    execute(input: DeleteCustomer.Input): Promise<void>
}

export namespace DeleteCustomer {
    export type Input = {
        rg: string
    }
}