export abstract class BaseException extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
    readonly name: string,
  ) {
    super(message);
  }
}
