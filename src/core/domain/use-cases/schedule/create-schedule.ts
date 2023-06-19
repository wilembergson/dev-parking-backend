export interface CreateSchedule {
  execute(input: CreateSchedule.Input): Promise<void>
}

export namespace CreateSchedule {
  export type Input = {
    vehiclePlate: string;
    pricePerHour: number;
    vacancyId: string;
    customerId: string;
    employeeUserId: string;
  };
}