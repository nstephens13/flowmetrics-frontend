/**
 *
 * @prop {number} id employee id
 * @prop {string} firstName first name of the employee
 * @prop {string} lastName family name of the employee
 */
export interface EmployeeIF {
  id: number;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}
