import type { EmployeeIF } from '../model/EmployeeIF';

export function getCssHeightForStatisticBoxes(count: number) {
  const minHeight = 5; // Minimum height for the box
  const maxHeight = 80; // Maximum height for the box
  // Calculate the height based on the count
  return Math.min(minHeight + count * 5, maxHeight);
}

export function calculateCssUserBackgroundStyle(employee: EmployeeIF) {
  const firstNameLength = employee.firstName.trim().length;
  const lastNameLength = employee.lastName.trim().length;
  const nameLength = (firstNameLength + lastNameLength) * 10;
  // Calculate width of blue background behind username
  const width = nameLength + 10; // Add 10 pixels for padding
  // Calculate height of blue background behind username
  const height = 10 + (nameLength > 0 ? 10 : 0);
  return { width, height };
}
