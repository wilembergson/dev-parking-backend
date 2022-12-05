import { Car } from '@domain/entities';
import { faker } from '@faker-js/faker';

describe('Car', () => {
  it('should be able to get entity state.', () => {
    const sut = new Car({
      name: faker.name.firstName(),
      brand: faker.name.firstName(),
      plate: faker.name.firstName(),
    });
    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('name');
    expect(sut.getState()).toHaveProperty('brand');
    expect(sut.getState()).toHaveProperty('plate');
  });

  it('should be able to update entity state.', () => {
    const sut = new Car({
      name: faker.name.firstName(),
      brand: faker.name.firstName(),
      plate: faker.name.firstName(),
    });
    const updateData = {
      name: faker.name.firstName(),
      brand: faker.name.firstName(),
      plate: faker.name.firstName(),
    };
    sut.update(updateData);
    expect(sut.getState()).toMatchObject(updateData);
  });
});
