export interface CreateSchedule{
    execute(input: CreateSchedule.Input): Promise<void>
}

export namespace CreateSchedule {
    export type Input = {
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      vacancyId: string;
      customerId: string;
    };
  }