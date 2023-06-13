import { EmployeeUser } from '@domain/entities';

describe('User', () => {
  it('should be able to get entity state.', () => {
    const sut = new EmployeeUser({
      name: 'valido',
      email: 'valido',
      password: 'valido',
      age: 22,
    });
    expect(sut.getState()).toHaveProperty('id');
    expect(sut.getState()).toHaveProperty('name');
    expect(sut.getState()).toHaveProperty('email');
    expect(sut.getState()).toHaveProperty('password');
    expect(sut.getState()).toHaveProperty('age');
  });

  it('should be able to update entity state.', () => {
    const sut = new EmployeeUser({
      name: 'valido',
      email: 'valido',
      password: 'valido',
      age: 22,
    });
    const updateData = {
      name: 'valido2',
      email: 'valido2',
      password: 'valido2',
      age: 32,
    };
    sut.update(updateData);
    expect(sut.getState()).toMatchObject(updateData);
  });
});
