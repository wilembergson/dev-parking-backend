import { Scheduleing } from '@domain/entities';

export interface ScheduleingRepository {
  findMany(): Promise<Scheduleing[] | null>;

  save(Scheduleing: Scheduleing): Promise<void>;
}
