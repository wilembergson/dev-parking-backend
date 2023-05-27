import { BaseException } from './base-exception';

export class ScheduleNotFound extends BaseException {
  constructor() {
    super('Schedule not found.', 404, 'ScheduleNotFound');
  }
}
