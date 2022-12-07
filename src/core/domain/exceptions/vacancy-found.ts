import { BaseException } from './base-exception';

export class VacancyFound extends BaseException {
  constructor() {
    super('This vacancy is alread registered.', 404);
  }
}
