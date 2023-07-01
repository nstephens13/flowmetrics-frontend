import type { EmployeeIF } from '../model/EmployeeIF';

// TODO: Move to a more appropriate place or
// rework EmployeeOverview.vue with PrimeFlex to avoid this

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

export function parseCategoryNames(mapToRead: Map<EmployeeIF, any>): {
  firstCategory: string;
  secondCategory: string;
  thirdCategory: string;
} {
  const categoryNames: { firstCategory: string; secondCategory: string; thirdCategory: string } = {
    firstCategory: '',
    secondCategory: '',
    thirdCategory: '',
  };

  const keys = mapToRead.keys();
  const firstKey = keys.next().value;
  const sampleTuple = mapToRead.get(firstKey);

  if (sampleTuple) {
    const tupleKeys = Object.keys(sampleTuple);
    [categoryNames.firstCategory, categoryNames.secondCategory, categoryNames.thirdCategory] =
      tupleKeys;
  }

  return categoryNames;
}
export function assignWorkloadMapToBars(
  workloadMap: Map<
    EmployeeIF,
    {
      planning: number;
      development: number;
      testing: number;
    }
  >
): Map<EmployeeIF, { firstBar: number; secondBar: number; thirdBar: number }> {
  const newMap: Map<EmployeeIF, { firstBar: number; secondBar: number; thirdBar: number }> =
    new Map();
  workloadMap.forEach(
    (tuple: { planning: number; development: number; testing: number }, employee: EmployeeIF) => {
      newMap.set(employee, {
        firstBar: tuple.planning,
        secondBar: tuple.development,
        thirdBar: tuple.testing,
      });
    }
  );
  return newMap;
}
