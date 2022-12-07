export abstract class BaseException extends Error {
  constructor(readonly message: string, readonly statusCode: number) {
    super(message);
  }
}
