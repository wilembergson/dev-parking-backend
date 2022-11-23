import { Car } from '@domain/entities';
import { faker } from '@faker-js/faker';

describe('Car', () => {
  it('should be able to get entity state.', () => {
    const sut = new Car({
      name: faker.name.firstName(),
      brand: faker.name.firstName(),
      board: faker.name.firstName(),
      price: 554,
    });
    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('name');
    expect(sut.getState()).toHaveProperty('brand');
    expect(sut.getState()).toHaveProperty('board');
    expect(sut.getState()).toHaveProperty('price');
  });

  it('should be able to update entity state.', () => {
    const sut = new Car({
      name: faker.name.firstName(),
      brand: faker.name.firstName(),
      board: faker.name.firstName(),
      price: 554,
    });
    const updateData = {
      name: faker.name.firstName(),
      brand: faker.name.firstName(),
      board: faker.name.firstName(),
      price: 554,
    };
    sut.update(updateData);
    expect(sut.getState()).toMatchObject(updateData);
  });
});
