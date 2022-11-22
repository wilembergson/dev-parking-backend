import { randomUUID } from 'node:crypto';

export class ID {
  readonly value: string;

  constructor(value?: string) {
    if (value) {
      this.validate(value);
      this.value = value;
    } else {
      this.value = this.generate();
    }
  }

  protected generate(): string {
    return randomUUID();
  }

  protected validate(value: string): void {
    const isValid =
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        value,
      );
    if (!isValid) throw new Error(`${value} is not a valid ID.`);
  }
}
