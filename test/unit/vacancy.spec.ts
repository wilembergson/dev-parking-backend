import { Vacancy } from '@domain/entities';
import { faker } from '@faker-js/faker';

describe('Vacancy', () => {
  it('should be able to get entity state.', () => {
    const sut = new Vacancy({
      localization: faker.name.firstName(),
    });
    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('localization');
  });

  it('should be able to update entity state.', () => {
    const sut = new Vacancy({
      localization: faker.name.firstName(),
    });
    const updateData = {
      localization: faker.name.firstName(),
    };
    sut.update(updateData);
    expect(sut.getState()).toMatchObject(updateData);
  });
});
