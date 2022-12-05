import { ID } from '@domain/entities/id';
import { faker } from '@faker-js/faker';

describe('ID', () => {
  it('should be able to create ID with param.', () => {
    const value = faker.datatype.uuid();
    const sut = new ID(value);
    expect(sut).toHaveProperty('value');
  });

  it('should be able to create ID with param.', () => {
    const value = faker.datatype.string();
    expect(() => new ID(value)).toThrow();
  });

  it('should be able to create ID with no param.', () => {
    const sut = new ID();
    expect(sut).toHaveProperty('value');
  });
});
