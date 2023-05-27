import { BaseException } from './base-exception';

export class VacancyNotFound extends BaseException {
  constructor() {
    super('Vacancy not found.', 404, 'VacancyNotFound');
  }
}
