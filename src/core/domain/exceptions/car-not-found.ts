import { BaseException } from './base-exception';

export class CarNotFound extends BaseException {
  constructor() {
    super('Car not found.', 404);
  }
}
