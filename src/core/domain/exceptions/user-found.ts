import { BaseException } from './base-exception';

export class UserFound extends BaseException {
  constructor() {
    super('This user is alread registered.', 404, 'UserFound');
  }
}
