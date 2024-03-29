import { Customer, Schedule, Vacancy } from '@domain/entities';
import { faker } from '@faker-js/faker';

describe('Schedule', () => {
  it('should be able to get entity state.', () => {
    const car = new Car({
      name: faker.datatype.string(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    const vacancy = new Vacancy({
      localization: faker.name.firstName(),
    });
    const sut = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });
    sut.addCustomer(car);
    sut.addVacancy(vacancy);

    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('checkIn');
    expect(sut.getState()).toHaveProperty('checkOut');
    expect(sut.getState()).toHaveProperty('vacancy');
    expect(sut.getState()).toHaveProperty('car');
  });
  it('should be able to get entity state with null checkout.', () => {
    const car = new Car({
      name: faker.datatype.string(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    const vacancy = new Vacancy({
      localization: faker.name.firstName(),
    });
    const sut = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: null,
    });
    sut.addCustomer(car);
    sut.addVacancy(vacancy);

    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('checkIn');
    expect(sut.getState()).toHaveProperty('checkOut');
    expect(sut.getState()).toHaveProperty('vacancy');
    expect(sut.getState()).toHaveProperty('car');
  });
  it('should be able to update entity state.', () => {
    const sut = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });
    const updateData = {
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
      vacancy: new Vacancy({
        localization: faker.name.firstName(),
      }),
      car: new Car({
        name: faker.datatype.string(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      }),
    };
    sut.update(updateData);
    expect(sut.getState()).toMatchObject(updateData);
  });
});
