import type { EmployeeIF } from '../EmployeeIF';

describe('EmployeeIF', () => {
  it('should have an emailAddress property of type string', () => {
    const employee: EmployeeIF = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@email.com',
      avatarUrl: 'none',
      status: 'active',
      key: 'jdoe',
    };
    expect(employee).toHaveProperty('emailAddress');
    expect(typeof employee.emailAddress).toBe('string');
  });
  it('should have a not nullable key property of type string', () => {
    const employee: EmployeeIF = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@email.com',
      avatarUrl: 'none',
      status: 'active',
      key: 'jdoe',
    };
    expect(employee).toHaveProperty('emailAddress');
    expect(typeof employee.key).toBe('string');
    expect(employee.key).not.toBeNull();
  });
});
