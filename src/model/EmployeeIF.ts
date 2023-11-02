/**
 *
 * @prop {number} id employee id
 * @prop {string} firstName first name of the employee
 * @prop {string} lastName family name of the employee
 * @prop {string} emailAddress email address of the employee
 * @prop {string} status the current status of the employee if is he still working or quit
 */
export interface EmployeeIF {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  status: 'active' | 'inactive';
}
