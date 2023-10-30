import type { EmployeeIF } from '../EmployeeIF';

describe('EmployeeIF', () => {
  it('should have an emailAddress property of type string', () => {
    const employee: EmployeeIF = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@email.com',
    };
    expect(employee).toHaveProperty('emailAddress');
    expect(typeof employee.emailAddress).toBe('string');
  });
});
