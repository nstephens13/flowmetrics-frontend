import type { EmployeeIF } from '../model/EmployeeIF';

export function getHeightForStatisticBoxes(count: number) {
  const minHeight = 5; // Minimum height for the box
  const maxHeight = 80; // Maximum height for the box
  const height = Math.min(minHeight + count * 5, maxHeight); // Calculate the height based on the count
  return height;
}

export function calculateUserBackgroundStyle(employee: EmployeeIF) {
  const firstNameLength = employee.firstName.trim().length;
  const lastNameLength = employee.lastName.trim().length;
  const nameLength = (firstNameLength + lastNameLength) * 8;
  const width = nameLength + 20; // Add 20 pixels for padding
  const height = 20 + (nameLength > 0 ? 10 : 0); // Adjust the height based on name length
  return { width, height };
}
