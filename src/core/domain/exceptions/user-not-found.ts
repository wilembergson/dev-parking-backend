import { BaseException } from './base-exception';

export class UserNotFound extends BaseException {
  constructor() {
    super('User not found.', 404);
  }
}
