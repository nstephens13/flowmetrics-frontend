export enum Category {
  planning = 'Planning',
  development = 'Development',
  testing = 'Testing',
  nonDisplayed = 'Non-displayed',
}

export const statusLists = {
  [Category.planning]: ['Planned', 'Design', 'Open'],
  [Category.development]: ['In work', 'Review', 'In progress'],
  [Category.testing]: ['Unit Test', 'E2E'],
  [Category.nonDisplayed]: ['Resolved', 'Closed'],
};

export const statusListsColors = {
  [Category.planning]: '#4b8bf2',
  [Category.development]: '#025ff5',
  [Category.testing]: '#0448b5',
  [Category.nonDisplayed]: '#002869',
};

export function getCategory(status: string): Category | null {
  const foundCategory = Object.keys(statusLists).find((cat) =>
    (statusLists as any)[cat].includes(status)
  );
  return foundCategory as Category | null;
}

export function getColorsforStatuses(status: string[]): string[] {
  const colors: string[] = [];
  status.forEach((stat) => {
    const category = getCategory(stat);
    if (category) {
      colors.push(statusListsColors[category]);
    }
  });
  return colors;
}
