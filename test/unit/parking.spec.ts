import { Parking } from '@domain/entities';
import { faker } from '@faker-js/faker';

describe('Parking', () => {
  it('should be able to get entity state.', () => {
    const sut = new Parking({
      localization: faker.name.firstName(),
      vacancies: faker.datatype.number(),
    });
    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('localization');
    expect(sut.getState()).toHaveProperty('vacancies');
  });

  it('should be able to update entity state.', () => {
    const sut = new Parking({
      localization: faker.name.firstName(),
      vacancies: faker.datatype.number(),
    });
    const updateData = {
      localization: faker.name.firstName(),
      vacancies: faker.datatype.number(),
    };
    sut.update(updateData);
    expect(sut.getState()).toMatchObject(updateData);
  });
});
