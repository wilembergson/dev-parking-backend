export interface GetUser {
  execute(input: GetUser.Input): Promise<GetUser.Output>
}

export namespace GetUser {
  export type Input = Partial<{
    id: string;
    email: string;
  }>;
  export type Output = {
    id: string;
    name: string;
    rg: string;
    email: string;
  };
}
